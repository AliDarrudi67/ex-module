import { CommonModule } from '@angular/common';
import { Component, Input, Optional } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IconLoadingComponent } from '@shared/components/icons/icon-loading/icon-loading.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [
    LucideAngularModule,
    FormsModule,
    ReactiveFormsModule,
    IconLoadingComponent,
    CommonModule,
  ],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss',
})
export class FormContainerComponent {
  form!: FormGroup;
  @Input() title = '';
  @Input() formLoading = false;

  constructor(
    @Optional() private dialogRef?: MatDialogRef<FormContainerComponent>
  ) {}

  get isInDialog(): boolean {
    return !!this.dialogRef;
  }

  onCancel() {
    if (this.isInDialog) {
      this.dialogRef?.close();
    } else {
      history.back();
    }
  }
}
