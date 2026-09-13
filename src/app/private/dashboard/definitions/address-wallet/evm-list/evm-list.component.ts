import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { MainService } from '@core/services/main.service';
import { BaseComponent } from '@shared/components/base/base.component';
import { SliderComponent } from '@shared/components/slider/slider.component';
import { IApiResponse } from '@shared/models/api-response.model';
import { IEvmListData } from '@shared/models/evm/evm-list.model';
import { IEvm } from '@shared/models/evm/evm.model';
import { LucideAngularModule } from 'lucide-angular';
import { BlockchainListComponent } from '../blockchain-list/blockchain-list.component';

@Component({
  selector: 'app-evm-list',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    BlockchainListComponent,
    SliderComponent,
  ],
  templateUrl: './evm-list.component.html',
  styleUrl: './evm-list.component.scss',
})
export class EvmListComponent extends BaseComponent implements OnInit {
  evms: IEvm[] = [];
  selectedEvmId: string = '';
  payloadEvm = {
    page: 1,
    limit: 10,
    filter: {},
    sort: {
      createdAt: 1,
    },
  };
  @Output() selectedEvm = new EventEmitter<string>();

  constructor(private mainService: MainService) {
    super();
  }

  ngOnInit(): void {
    this.getEvms(this.evms);
  }

  getEvms(allData: IEvm[] = []) {
    this.mainService
      .post<IApiResponse<IEvmListData>>(
        ApiEndpoints.evm.pagination,
        this.payloadEvm
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const data = response?.result?.data || [];

          if (data.length > 0) {
            // افزودن داده‌های فعلی به کل مجموعه
            allData.push(...data);

            // رفتن به صفحه بعد
            this.payloadEvm.page++;

            // ادامه بازگشتی تا زمانی که سرور دیتا بده
            this.getEvms(allData);
          } else {
            // وقتی داده‌ها تموم شد
            this.evms = allData;
          }
        },
        error: (err) => {},
      });
  }

  setEvmId(evmId: string = '') {
    this.selectedEvm.emit(evmId);
    this.selectedEvmId = evmId;
  }
}
