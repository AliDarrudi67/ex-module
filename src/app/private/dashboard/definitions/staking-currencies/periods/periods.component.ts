import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { PeriodGridConfig } from '@core/config/grid/period.config';
import { MainService } from '@core/services/main.service';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { PeriodFormComponent } from './period-form/period-form.component';

@Component({
  selector: 'app-periods',
  standalone: true,
  imports: [ButtonComponent, GridComponent, RouterModule],
  templateUrl: './periods.component.html',
  styleUrl: './periods.component.scss',
})
export class PeriodsComponent {
  columns: IGridColumn[] = PeriodGridConfig;

  data = [
    {
      id: 1,
      length: '90روزه',
      income: 6,
    },
    {
      id: 2,
      length: '60 روزه',
      income: 4,
    },
    {
      id: 3,
      length: '30 روزه',
      income: 2,
    },
  ];

  constructor(private dialog: MatDialog, private mainService: MainService) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = {};
    this.dialog.open(PeriodFormComponent, dialogConfig);
  }

  editRecord(data: any) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = data;
    this.dialog.open(PeriodFormComponent, dialogConfig);
  }
}
