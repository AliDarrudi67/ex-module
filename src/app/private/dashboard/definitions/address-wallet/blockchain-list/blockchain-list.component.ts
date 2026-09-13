import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { MainService } from '@core/services/main.service';
import { BaseComponent } from '@shared/components/base/base.component';
import { SliderComponent } from '@shared/components/slider/slider.component';
import { IApiResponse } from '@shared/models/api-response.model';
import { IChainListData } from '@shared/models/chain/chain-list.model';
import { IChain } from '@shared/models/chain/chain.model';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-blockchain-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SliderComponent],
  templateUrl: './blockchain-list.component.html',
  styleUrl: './blockchain-list.component.scss',
})
export class BlockchainListComponent
  extends BaseComponent
  implements OnChanges
{
  chains: IChain[] = [];
  chainEndpoint = '';
  payloadChain = {
    page: 1,
    limit: 10,
    filter: {},
    sort: {
      createdAt: 1,
    },
  };

  @Input() evmId: string = '';

  constructor(private mainService: MainService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadChains(changes['evmId'].currentValue);
  }

  ngOnInit(): void {}

  loadChains(evmId: string, allChains: IChain[] = []) {
    this.chainEndpoint = ApiEndpoints.evm.chains(evmId);

    if (evmId !== 'all') {
      this.mainService
        .post<IApiResponse<IChainListData>>(
          this.chainEndpoint,
          this.payloadChain
        )
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response) => {
            const data = response.result.data || [];

            if (data.length > 0) {
              allChains.push(...data); // اضافه کردن داده‌های جدید
              this.payloadChain.page++; // رفتن به صفحه بعد

              // بازگشتی تا وقتی سرور دیتا بده
              this.loadChains(evmId, allChains);
            } else {
              // تموم شد — همه داده‌ها جمع شدن ✅
              this.chains = allChains;
              console.log('✅ همه chainها لود شدند:', this.chains);

              // برگردوندن صفحه به حالت اولیه تا دفعه بعد از اول شروع کنه
              this.payloadChain.page = 1;
            }
          },
          error: (err) => {
            console.error('❌ خطا در گرفتن chainها:', err);
          },
        });
    }
  }
}
