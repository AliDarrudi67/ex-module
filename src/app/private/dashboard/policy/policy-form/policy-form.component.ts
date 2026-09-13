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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencyPairFormComponent } from '../../admin/account-level/currency-pair/currency-pair-form/currency-pair-form.component';
import { FormContainerComponent } from '../../layout/form-container/form-container.component';
import { FormFooterComponent } from '../../layout/form-footer/form-footer.component';

@Component({
  selector: 'app-policy-form',
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
    FormContainerComponent,
    FormFooterComponent,
  ],
  templateUrl: './policy-form.component.html',
  styleUrl: './policy-form.component.scss',
})
export class PolicyFormComponent {
  form!: FormGroup;
  formTitle = 'پالیسی';

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      asset: ['', Validators.required],
      network: ['', Validators.required],
      minDeposit: ['', [Validators.required]],
      networkFee: ['', [Validators.required]],
      minBalance: ['', [Validators.required]],
      speed: ['', Validators.required],
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
