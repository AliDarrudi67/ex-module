import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { WithdrawGridConfig } from '@core/config/grid/withdraw.config';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IconArrowDownComponent } from '@shared/components/icons/icon-arrow-down/icon-arrow-down.component';
import { IconArrowRightComponent } from '@shared/components/icons/icon-arrow-right/icon-arrow-right.component';
import { IconClockHistoryComponent } from '@shared/components/icons/icon-clock-history/icon-clock-history.component';
import { IconHistoryComponent } from '@shared/components/icons/icon-history/icon-history.component';
import { IconPasteComponent } from '@shared/components/icons/icon-paste/icon-paste.component';
import { IconRefreshComponent } from '@shared/components/icons/icon-refresh/icon-refresh.component';
import { IconScanComponent } from '@shared/components/icons/icon-scan/icon-scan.component';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { LucideAngularModule } from 'lucide-angular';
import { HelpBoxComponent } from './help-box/help-box.component';

@Component({
  selector: 'app-user-withdraw',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    IconArrowDownComponent,
    LucideAngularModule,
    GridComponent,
    IconArrowRightComponent,
    IconScanComponent,
    IconPasteComponent,
    ButtonComponent,
    IconHistoryComponent,
    IconClockHistoryComponent,
    IconRefreshComponent,
    HelpBoxComponent,
  ],
  templateUrl: './user-withdraw.component.html',
  styleUrl: './user-withdraw.component.scss',
})
export class UserWithdrawComponent {
  columns: IGridColumn[] = WithdrawGridConfig;
}
