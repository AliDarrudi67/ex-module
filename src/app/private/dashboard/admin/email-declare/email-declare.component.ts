import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { emailDeclareGridConfig } from '@core/config/grid/email-declare.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IDialog } from '@shared/models/dialog.model';
import { IEmailDeclare } from '@shared/models/email-declare/email-declare.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { EmailDeclareFormComponent } from './email-declare-form/email-declare-form.component';

@Component({
  selector: 'app-email-declare',
  standalone: true,
  imports: [GridComponent, RouterModule],
  templateUrl: './email-declare.component.html',
  styleUrl: './email-declare.component.scss',
})
export class EmailDeclareComponent {
  columns: IGridColumn[] = emailDeclareGridConfig;
  listEndpoint = ApiEndpoints.emailDeclare.pagination;
  deleteEndpoint = ApiEndpoints.emailDeclare.base;
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(private dialog: MatDialog, private mainService: MainService) {}

  ngOnInit(): void {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    const dialog = this.dialog.open(EmailDeclareFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }

  editRecord(emailDeclare: IEmailDeclare) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = emailDeclare;
    const dialog = this.dialog.open(EmailDeclareFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
