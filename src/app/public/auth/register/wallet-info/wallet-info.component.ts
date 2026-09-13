import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MainService } from '@core/services/main.service';
import { WalletConnectService } from '@core/services/wallet-connect.service';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-wallet-info',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ButtonComponent, RouterModule],
  templateUrl: './wallet-info.component.html',
  styleUrl: './wallet-info.component.scss',
})
export class WalletInfoComponent {
  constructor(
    public mainService: MainService,
    public walletConnectService: WalletConnectService,
    private matDialogRef: MatDialogRef<WalletInfoComponent>,
    private router: Router
  ) {}

  closeDialog() {
    this.matDialogRef.close();
    this.walletConnectService.loading = false;
  }

  setRole() {
    this.walletConnectService.loading = false;
    this.closeDialog();
    this.router.navigate(['/auth/set-role']);
  }
}
