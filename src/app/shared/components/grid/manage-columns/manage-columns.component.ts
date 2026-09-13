import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { IGridColumn } from '../../../models/grid-columns.model';
import { ButtonComponent } from '../../buttons/button/button.component';

@Component({
  selector: 'app-manage-columns',
  standalone: true,
  imports: [CommonModule, ButtonComponent, FormsModule, LucideAngularModule],
  templateUrl: './manage-columns.component.html',
  styleUrl: './manage-columns.component.scss',
})
export class ManageColumnsComponent {
  @Input() columns: any[] = [];
  @Input() isMobile = false;
  @Input() tableName: string = '';
  @Output() columnsChange = new EventEmitter<any[]>();
  showColumns = false;

  constructor(private el: ElementRef) {}
  ngOnInit() {
    this.loadColumnPreferences();
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: EventTarget) {
    const node = target as Node; // تبدیل به Node
    const clickedInside = this.el.nativeElement.contains(node);
    if (!clickedInside) {
      this.showColumns = false;
    }
  }

  /** زمانی که کاربر تیک یک ستون را تغییر می‌دهد */
  toggleColumn() {
    this.columnsChange.emit(this.columns);
  }

  /** بارگذاری از localStorage */
  private loadColumnPreferences() {
    const saved = localStorage.getItem(`columns_${this.tableName}`);
    if (saved) {
      const visibleFields: string[] = JSON.parse(saved);
      this.columns.forEach((col) => {
        col.visible = visibleFields.includes(col.field);
      });
    } else {
      // اگر چیزی ذخیره نشده، پیش‌فرض همه فعال باشن
      this.columns.forEach((col) => (col.visible = true));
    }
  }

  toggleMask(col: IGridColumn) {
    col.masked = !col.masked;
    this.columnsChange.emit(this.columns);
  }

  hideAllColumns() {
    // بررسی می‌کنیم آیا ستونی وجود دارد که masked آن با بقیه متفاوت باشد
    const firstMasked = this.columns[0]?.masked;
    const hasDifference = this.columns.some(
      (col) => col.masked !== firstMasked
    );

    if (hasDifference) {
      // اگر تفاوت وجود داشت، ابتدا همه را false کنیم
      this.columns.forEach((item) => (item.masked = false));
    }

    // سپس کار اصلی: تغییر وضعیت masked برای همه ستون‌ها
    this.columns.forEach((item) => (item.masked = !item.masked));

    this.columnsChange.emit(this.columns);
  }

  togglePanel(event: Event) {
    event.stopPropagation(); // جلوگیری از فعال شدن HostListener
    this.showColumns = !this.showColumns;
  }
}
