import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { ArchitectureGridConfig } from '@core/config/grid/architecture.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IArch } from '@shared/models/arch/arch.model';
import { IDialogConfig } from '@shared/models/dialog-config.model';
import { IDialog } from '@shared/models/dialog.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { ArchitectureFormComponent } from './architecture-form/architecture-form.component';

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [GridComponent, RouterModule],
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.scss',
})
export class ArchitectureComponent implements OnInit {
  columns: IGridColumn[] = ArchitectureGridConfig;
  blockchainId = '';
  deleteEndpoint = ApiEndpoints.architecture.base;
  listEndpoint = '';
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private mainService: MainService
  ) {}

  ngOnInit(): void {
    this.blockchainId = this.route.snapshot.params['blockchainId'];
    this.listEndpoint = ApiEndpoints.blockchain.architectures(
      this.blockchainId
    );
  }

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data.chainId = this.blockchainId;
    this.openDialog(dialogConfig);
  }

  editRecord(arch: IArch) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = arch;
    this.openDialog(dialogConfig);
  }

  openDialog(dialogConfig: IDialogConfig) {
    const dialog = this.dialog.open(ArchitectureFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
