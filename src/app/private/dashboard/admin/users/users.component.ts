import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserGridConfig } from '@core/config/grid/user.config';
import { MainService } from '@core/services/main.service';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [GridComponent, ButtonComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  columns: IGridColumn[] = UserGridConfig;

  constructor(private dialog: MatDialog, private mainService: MainService) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = {};
    this.dialog.open(UserFormComponent, dialogConfig);
  }

  editRecord(data: any) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = data;
    this.dialog.open(UserFormComponent, dialogConfig);
  }
}
