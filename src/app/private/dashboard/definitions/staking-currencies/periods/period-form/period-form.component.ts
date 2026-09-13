import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormContainerComponent } from '@private/dashboard/layout/form-container/form-container.component';
import { FormFooterComponent } from '@private/dashboard/layout/form-footer/form-footer.component';
import { NumericOnlyDirective } from '@shared/directives/numeric-only.directive';
import Big from 'big.js';

@Component({
  selector: 'app-period-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    NumericOnlyDirective,
    MatInputModule,
    FormFooterComponent,
    FormContainerComponent,
  ],
  templateUrl: './period-form.component.html',
  styleUrl: './period-form.component.scss',
})
export class PeriodFormComponent {
  form: FormGroup;
  totalProfitError = false; // وضعیت خطا
  totalDaysError = false; // وضعیت خطای روزها
  formTitle = 'دوره';

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.formBuilder.group({
      duration: [null, [Validators.required, Validators.min(1)]],
      paymentCount: [null, [Validators.required, Validators.min(1)]],
      totalProfit: [null, [Validators.required, Validators.min(0)]],
      incomes: this.formBuilder.array([]),
    });

    this.form.get('paymentCount')?.valueChanges.subscribe((count) => {
      this.updateIncomeFields(count);
    });

    this.form.get('duration')?.valueChanges.subscribe(() => this.checkDaySum());
  }

  // گرفتن کنترل FormArray
  updateIncomeFields(count: number) {
    this.incomes.clear();
    if (count && count > 0) {
      for (let i = 0; i < count; i++) {
        const group = this.formBuilder.group({
          dayOffset: [null, [Validators.required, Validators.min(1)]],
          profit: [null, [Validators.required, Validators.min(0)]],
        });

        // ولیدیشن پویا
        group
          .get('dayOffset')
          ?.valueChanges.subscribe(() => this.checkDaySum());
        group
          .get('profit')
          ?.valueChanges.subscribe(() => this.checkProfitSum());

        this.incomes.push(group);
      }
    }
  }

  // جمع روزها
  checkDaySum() {
    const duration = this.form.get('duration')?.value || 0;
    const sumDays = this.incomes.controls
      .map((c) => c.get('dayOffset')?.value || 0)
      .reduce((a, b) => +a + +b, 0);

    this.totalDaysError = +sumDays !== +duration;
  }

  // جمع سودها (همون قبلی)
  checkProfitSum() {
    const totalProfit = new Big(this.form.get('totalProfit')?.value || 0);
    const sum = this.incomes.controls
      .map((c) => new Big(c.get('profit')?.value || 0))
      .reduce((a, b) => a.plus(b), new Big(0));

    this.totalProfitError = !sum.eq(totalProfit);
  }

  // getter برای راحتی
  get incomes(): FormArray {
    return this.form.get('incomes') as FormArray;
  }

  // ارسال فرم
  onSubmit() {
    if (this.form.valid && !this.totalProfitError && !this.totalDaysError) {
      console.log('فرم ارسال شد', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
