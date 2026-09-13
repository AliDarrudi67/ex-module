import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { SmtpGridConfig } from '@core/config/grid/smtp.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IDialog } from '@shared/models/dialog.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { ISmtp } from '@shared/models/smtp/smtp.model';
import { SmtpFormComponent } from './smtp-form/smtp-form.component';

@Component({
  selector: 'app-smtp',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './smtp.component.html',
  styleUrl: './smtp.component.scss',
})
export class SmtpComponent {
  columns: IGridColumn[] = SmtpGridConfig;
  listEndpoint = ApiEndpoints.smtp.pagination;
  deleteEndpoint = ApiEndpoints.smtp.base;
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(private dialog: MatDialog, private mainService: MainService) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = '';
    const dialog = this.dialog.open(SmtpFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload)
          if (response?.reload) this.gridComponent.loadData();
      },
    });
  }

  editRecord(smtp: ISmtp) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = smtp;
    const dialog = this.dialog.open(SmtpFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload)
          if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
