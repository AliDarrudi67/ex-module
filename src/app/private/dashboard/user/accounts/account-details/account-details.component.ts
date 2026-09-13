import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IGitWallet } from '@shared/models/account/account.model';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss',
})
export class AccountDetailsComponent {
  constructor(
    private matDialogRef: MatDialogRef<AccountDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public wallets: IGitWallet[]
  ) {}

  closeDialog() {
    this.matDialogRef.close();
  }
}
