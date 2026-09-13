import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { CryptoGridConfig } from '@core/config/grid/crypto.config';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { GridComponent } from '@shared/components/grid/grid.component';
import { ICrypto } from '@shared/models/crypto/crypto.model';
import { IGridColumn } from '@shared/models/grid-columns.model';

@Component({
  selector: 'app-crypto',
  standalone: true,
  imports: [GridComponent, RouterModule, ButtonComponent],
  templateUrl: './crypto.component.html',
  styleUrl: './crypto.component.scss',
})
export class CryptoComponent {
  columns: IGridColumn[] = CryptoGridConfig;
  listEndpoint = '';
  deleteEndpoint = ApiEndpoints.crypto.base;
  assetId = '';
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.assetId = route.snapshot.params['id'];
    this.listEndpoint = ApiEndpoints.asset.cryptos(this.assetId);
  }

  addNewRecord() {
    this.router.navigate(['new-crypto'], { relativeTo: this.route });
  }

  editRecord(data: ICrypto) {
    this.router.navigate(['edit-crypto/' + data?.cryptoId], {
      relativeTo: this.route,
    });
  }
}
