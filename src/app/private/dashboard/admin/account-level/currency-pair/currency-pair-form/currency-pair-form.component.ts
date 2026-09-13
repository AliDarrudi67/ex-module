import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormContainerComponent } from '@private/dashboard/layout/form-container/form-container.component';
import { FormFooterComponent } from '@private/dashboard/layout/form-footer/form-footer.component';
import { NumericOnlyDirective } from '@shared/directives/numeric-only.directive';

@Component({
  selector: 'app-currency-pair-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    NumericOnlyDirective,
    FormContainerComponent,
    FormFooterComponent,
  ],
  templateUrl: './currency-pair-form.component.html',
  styleUrl: './currency-pair-form.component.scss',
})
export class CurrencyPairFormComponent {
  form!: FormGroup;
  formTitle = 'جفت ارز';

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      marketType: ['', Validators.required],
      rate: [1, Validators.required],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      // اینجا می‌تونی داده‌ها رو به سرور بفرستی
    } else {
      console.log('Form is invalid');
    }
  }
}
