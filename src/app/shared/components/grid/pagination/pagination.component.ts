import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { IPaginationMeta } from '../../../models/pagination.model';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnChanges {
  pageSizeOptions = [5, 10, 20, 50];
  currentPage: number = 1;
  loadPagination = false;
  @Input() metaData!: IPaginationMeta;
  @Input() pageSize: number = 10;
  @Output() onPageChanged = new EventEmitter<number>();
  @Output() onPreviousPage = new EventEmitter<boolean>();
  @Output() onNextPage = new EventEmitter<boolean>();
  @Output() onChangePageSize = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    this.loadPagination = changes['metaData']?.currentValue?.page > 0;
  }

  changePageSize(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = Number(select.value);

    this.onChangePageSize.emit(value);
  }

  goToPage(page: number | string) {
    this.onPageChanged.emit(+page);
  }

  prevPage(): void {
    this.onPreviousPage.emit(true);
  }

  nextPage(): void {
    this.onNextPage.emit(true);
  }

  getDisplayedPages(): (number | string)[] {
    const total = this.metaData.pageCount; // 👈 تغییر از itemCount به pageCount
    const current = this.metaData.page;
    const delta = 2; // تعداد صفحات اطراف صفحه فعلی

    const range: (number | string)[] = [];

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }

    return range;
  }

  get totalPages(): number {
    return Math.ceil(this.metaData.itemCount / this.pageSize) + 10;
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }
}
