import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import {
  MatSelect,
  MatSelectChange,
  MatSelectModule,
} from '@angular/material/select';
import { MainService } from '@core/services/main.service';
import { debounceTime, map, Subject, switchMap } from 'rxjs';

import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-async-select',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatOptionModule, FormsModule],
  templateUrl: './async-select.component.html',
  styleUrl: './async-select.component.scss',
})
export class AsyncSelectComponent<
  T extends Record<string, unknown>
> extends BaseComponent {
  @Input() endpoint!: string; // مسیر API
  @Input() placeholder = 'جستجو';
  @Input() pageSize = 20;
  @Input() searchField!: keyof T;
  @Input() valueField!: keyof T;
  @Input() textField!: keyof T;
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  @ViewChild('select') select!: MatSelect;
  @Output() onSelectItem = new EventEmitter<string>();

  options: T[] = [];
  page = 1;
  loading = false;
  allDataLoaded = false;
  search$ = new Subject<string>();
  constructor(private mainService: MainService) {
    super();
  }

  ngOnInit() {
    this.loadOptions();

    this.search$
      .pipe(
        debounceTime(400),
        switchMap((term) => {
          this.page = 1;
          this.allDataLoaded = false;
          this.options = [];
          return this.fetchOptions(term);
        })
      )
      .subscribe((data: T[]) => {
        this.options = data;
      });
  }

  loadOptions(searchTerm: string = '') {
    if (!this.allDataLoaded && !this.loading) {
      this.loading = true;

      this.fetchOptions(searchTerm).subscribe((data: T[]) => {
        this.options = [...this.options, ...data];
        if (data.length === 0) this.allDataLoaded = true;
        this.loading = false;
        this.page++;
      });
    }
  }

  fetchOptions(searchTerm: string = '') {
    const payload = {
      page: this.page,
      limit: this.pageSize,
      filter: searchTerm ? { [this.searchField]: searchTerm } : {},
      sort: { createdAt: 1 },
    };

    return this.mainService
      .post<{ result: { data: T[] } }>(this.endpoint, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(map((res) => res.result.data));
  }

  onOpened() {
    const panel = this.select.panel?.nativeElement;
    if (panel) {
      panel.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.loadOptions();
    }
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    this.search$.next(value);
  }

  setSelectedItem($event: MatSelectChange) {
    this.onSelectItem.emit($event?.value);
  }
}
