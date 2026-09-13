import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AccountLevelGridConfig } from '@core/config/grid/account-level.config';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IGridColumn } from '@shared/models/grid-columns.model';

@Component({
  selector: 'app-account-level',
  standalone: true,
  imports: [GridComponent, ButtonComponent, RouterModule],
  templateUrl: './account-level.component.html',
  styleUrl: './account-level.component.scss',
})
export class AccountLevelComponent {
  columns: IGridColumn[] = AccountLevelGridConfig;

  constructor(private router: Router, private route: ActivatedRoute) {}

  addNewRecord() {
    this.router.navigate(['new-account'], { relativeTo: this.route });
  }

  editRecord(data: any) {
    this.router.navigate(['edit-account/' + data?.accountId], {
      relativeTo: this.route,
    });
  }
}
