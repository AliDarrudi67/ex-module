import { Component, Input, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';

@Component({
  selector: 'app-form-footer',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './form-footer.component.html',
  styleUrl: './form-footer.component.scss',
})
export class FormFooterComponent {
  @Input() form!: FormGroup;
  @Input() loading = false;

  constructor(
    @Optional() private dialogRef?: MatDialogRef<FormFooterComponent>
  ) {}

  onCancel() {
    if (this.isInDialog) {
      this.dialogRef?.close({ reload: false });
    } else {
      history.back();
    }
  }

  get isInDialog(): boolean {
    return !!this.dialogRef;
  }

  closeDialog() {
    if (this.form.valid) {
      if (this.isInDialog) {
        this.dialogRef?.close({ reload: true });
      } else {
        history.back();
      }
    }
  }
}
