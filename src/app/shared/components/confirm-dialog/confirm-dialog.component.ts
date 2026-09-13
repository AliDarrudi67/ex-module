import { Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialogRef } from '@angular/material/dialog';
import { IConfirmDialog } from '../../models/confirm-dialog.model';
import { ButtonComponent } from '../buttons/button/button.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: true,
  imports: [ButtonComponent],
})
export class ConfirmDialogComponent {
  private dialogRef = inject(MatDialogRef, { optional: true });
  private bottomSheetRef = inject(MatBottomSheetRef, { optional: true });

  setResponse(param: boolean) {
    const result: IConfirmDialog = { result: param };

    if (this.dialogRef) {
      this.dialogRef.close(result);
    } else if (this.bottomSheetRef) {
      this.bottomSheetRef.dismiss(result);
    }
  }
}
