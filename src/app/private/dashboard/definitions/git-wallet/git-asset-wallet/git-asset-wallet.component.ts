import { Component } from '@angular/core';
import { GridComponent } from '@shared/components/grid/grid.component';

@Component({
  selector: 'app-git-asset-wallet',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './git-asset-wallet.component.html',
  styleUrl: './git-asset-wallet.component.scss',
})
export class GitAssetWalletComponent {
  // columns: IGridColumn[] = GitWalletTransferGridConfig;
  // listEndpoint = ApiEndpoints.gitWalletTransfer.pagination;
  // deleteEndpoint = ApiEndpoints.gitWalletTransfer.base;
  // gitWalletId = '';
  // @ViewChild(GridComponent) gridComponent!: GridComponent;
  // constructor(
  //   private dialog: MatDialog,
  //   private mainService: MainService,
  //   private route: ActivatedRoute
  // ) {
  //   this.gitWalletId = route.snapshot.params['gitWalletId'];
  //   this.listEndpoint += '/' + this.gitWalletId;
  // }
  // addNewRecord() {
  //   const dialogConfig = this.mainService.defaultDialogConfig;
  //   dialogConfig.data = {};
  //   const dialog = this.dialog.open(TransferFormComponent, dialogConfig);
  //   dialog.afterClosed().subscribe({
  //     next: (response: any) => {
  //       if (response?.reload) this.gridComponent.loadData();
  //     },
  //   });
  // }
  // editRecord(data: any) {
  //   const dialogConfig = this.mainService.defaultDialogConfig;
  //   dialogConfig.data = data;
  //   const dialog = this.dialog.open(TransferFormComponent, dialogConfig);
  //   dialog.afterClosed().subscribe({
  //     next: (response: any) => {
  //       if (response?.reload) this.gridComponent.loadData();
  //     },
  //   });
  // }
}
