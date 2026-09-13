import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CurrencyPairGridConfig } from '@core/config/grid/currency-pair.config';
import { MainService } from '@core/services/main.service';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { CurrencyPairFormComponent } from './currency-pair-form/currency-pair-form.component';

@Component({
  selector: 'app-currency-pair',
  standalone: true,
  imports: [GridComponent, ButtonComponent, RouterModule],
  templateUrl: './currency-pair.component.html',
  styleUrl: './currency-pair.component.scss',
})
export class CurrencyPairComponent {
  accountId = -1;
  columns: IGridColumn[] = CurrencyPairGridConfig;

  constructor(
    private dialog: MatDialog,
    private mainService: MainService,
    private route: ActivatedRoute
  ) {
    this.accountId = route.snapshot.params['id'];
  }

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = {};
    this.dialog.open(CurrencyPairFormComponent, dialogConfig);
  }

  editRecord(data: any) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = data;
    this.dialog.open(CurrencyPairFormComponent, dialogConfig);
  }
}
