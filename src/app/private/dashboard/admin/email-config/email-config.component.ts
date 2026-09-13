import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { EmailConfigGridConfig } from '@core/config/grid/email-config.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IDialog } from '@shared/models/dialog.model';
import { IEmailConfig } from '@shared/models/email-config/email-config.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { EmailConfigFormComponent } from './email-config-form/email-config-form.component';

@Component({
  selector: 'app-email-config',
  standalone: true,
  imports: [GridComponent, RouterModule],
  templateUrl: './email-config.component.html',
  styleUrl: './email-config.component.scss',
})
export class EmailConfigComponent {
  columns: IGridColumn[] = EmailConfigGridConfig;
  listEndpoint = ApiEndpoints.emailConfig.pagination;
  deleteEndpoint = ApiEndpoints.emailConfig.base;
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(private dialog: MatDialog, private mainService: MainService) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = {};
    const dialog = this.dialog.open(EmailConfigFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload)
          if (response?.reload) this.gridComponent.loadData();
      },
    });
  }

  editRecord(emailConfig: IEmailConfig) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = emailConfig;
    const dialog = this.dialog.open(EmailConfigFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload)
          if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
