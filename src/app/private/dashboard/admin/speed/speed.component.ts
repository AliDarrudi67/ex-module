import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpeedGridConfig } from '@core/config/grid/speed.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { SpeedFormComponent } from './speed-form/speed-form.component';

@Component({
  selector: 'app-speed',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './speed.component.html',
  styleUrl: './speed.component.scss',
})
export class SpeedComponent {
  columns: IGridColumn[] = SpeedGridConfig;

  constructor(private dialog: MatDialog, public mainService: MainService) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = {};
    this.dialog.open(SpeedFormComponent, dialogConfig);
  }

  editRecord(data: any) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = data;
    this.dialog.open(SpeedFormComponent, dialogConfig);
  }
}
