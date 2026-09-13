import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { MainService } from '@core/services/main.service';
import { LucideAngularModule } from 'lucide-angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { IConfirmDialog } from '../../models/confirm-dialog.model';
import { IGridColumn } from '../../models/grid-columns.model';
import { IPaginationMeta } from '../../models/pagination.model';
import { BaseComponent } from '../base/base.component';
import { ButtonComponent } from '../buttons/button/button.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { IconExcelComponent } from '../icons/icon-excel/icon-excel.component';
import { IconLoadingComponent } from '../icons/icon-loading/icon-loading.component';
import { IconNoDataComponent } from '../icons/icon-no-data/icon-no-data.component';
import { IconPdfComponent } from '../icons/icon-pdf/icon-pdf.component';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { ManageColumnsComponent } from './manage-columns/manage-columns.component';
import { PaginationComponent } from './pagination/pagination.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    IconExcelComponent,
    IconPdfComponent,
    ButtonComponent,
    ManageColumnsComponent,
    TooltipComponent,
    LucideAngularModule,
    RouterModule,
    IconNoDataComponent,
    PaginationComponent,
    NgxSkeletonLoaderModule,
    IconLoadingComponent,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent extends BaseComponent implements OnChanges {
  @Input() columns: IGridColumn[] = [];
  @Input() crudButton: boolean = true;
  @Input() op: boolean = true;
  @Input() pageSize: number = 10;
  @Input() newRecordButtonTitle: string = 'ایجاد رکورد';
  @Output() details: EventEmitter<any> = new EventEmitter<any>();
  @Output() newRecord: EventEmitter<any> = new EventEmitter<any>();
  @Output() editRecord: EventEmitter<any> = new EventEmitter<any>();
  @Input() columnTemplates: { [key: string]: TemplateRef<any>[] } = {};
  @Input() noEdit: boolean = false;
  @Input() noDelete: boolean = false;
  @Input() listEndpoint = '';
  @Input() deleteEndpoint = '';
  @Input() entity = '';
  @Input() filter = {};
  @Input() showBreadcrumb = true;
  @Input() export = true;
  @Input() showColumnSetting = true;

  data: any[] = [];
  loading = true;
  tableName = '';
  isMobile = false;
  metaData: IPaginationMeta = {} as IPaginationMeta;
  payload = {
    page: 1,
    limit: 10,
    filter: {},
    sort: {
      createdAt: 1,
    },
  };

  constructor(
    private dialog: MatDialog,
    public mainService: MainService,
    private router: Router
  ) {
    super();
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 992;
    }
    this.tableName = this.router.url.split('?')[0].replace(/\//g, '_');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter'] && changes['filter'].currentValue) {
      this.payload.filter = changes['filter'].currentValue;
      this.loadData();
    }
  }

  ngOnInit() {
    this.applyColumnPreferences();
    this.loadData();
  }

  previousPage() {
    this.payload.page--;
    this.loadData();
  }

  nextPage() {
    this.payload.page++;
    this.loadData(this.payload.page);
  }

  changePageSize(pageSize: number) {
    this.payload.limit = pageSize;
    this.loadData();
  }

  loadData(page: number = 1) {
    this.payload.page = page;
    this.mainService
      .post(this.listEndpoint, this.payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          this.data = response?.result?.data ?? [];
          this.metaData = response?.result?.metaData;
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        },
      });
  }

  deleteRecord(record: any) {
    const dialog = this.dialog.open(
      ConfirmDialogComponent,
      this.mainService.defaultDialogConfig
    );
    dialog.afterClosed().subscribe({
      next: (response: IConfirmDialog) => {
        if (response?.result) {
          this.mainService
            .delete(this.deleteEndpoint + '/' + record[this.entity + 'Id'])
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => {
                this.loadData();
              },
            });
        }
      },
    });
  }

  get visibleColumns() {
    return this.columns.filter((col) => col.visible);
  }

  applyColumnPreferences() {
    const saved = localStorage.getItem(`columns_${this.tableName}`);
    if (saved) {
      const visibleFields: string[] = JSON.parse(saved);
      this.columns.forEach((col) => {
        col.visible = visibleFields.includes(col.field);
      });
    } else {
      this.columns.forEach((col) => (col.visible = true));
    }
  }

  /** ذخیره تغییر وضعیت ستون‌ها */
  updateVisibleColumns(updatedColumns: any[]) {
    this.columns = updatedColumns;
    const visibleFields = updatedColumns
      .filter((c) => c.visible)
      .map((c) => c.field);
    localStorage.setItem(
      `columns_${this.tableName}`,
      JSON.stringify(visibleFields)
    );
  }

  exportExcel(mode: 'current' | 'all') {
    // TODO: اینجا کد واقعی خروجی اکسل بیاد
  }

  exportPDF(mode: 'current' | 'all') {
    // TODO: اینجا کد واقعی خروجی PDF بیاد
  }

  newRecordMethod() {
    this.newRecord.emit(true);
  }

  editRecordMethod(record: any) {
    this.editRecord.emit(record);
  }

  isAddressField(field: string): boolean {
    return ['contractId', 'contractIdDeposit', 'contractIdWithdraw'].includes(
      field
    );
  }

  shortenAddress(address: string): string {
    if (!address) return '';
    return address.length > 12
      ? `${address.slice(0, 10)}...${address.slice(-5)}`
      : address;
  }

  getWemLabel(wem: string) {
    if (wem === 'w') return 'Wallet';
    if (wem === 'e') return 'Email';
    if (wem === 'm') return 'Mobile';
    return '';
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  }
}
