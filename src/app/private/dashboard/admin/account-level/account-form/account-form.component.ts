import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { MainService } from '@core/services/main.service';
import { BaseComponent } from '@shared/components/base/base.component';
import { NumericOnlyDirective } from '@shared/directives/numeric-only.directive';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { FormFooterComponent } from '../../../layout/form-footer/form-footer.component';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    NumericOnlyDirective,
    FormContainerComponent,
    FormFooterComponent,
  ],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss',
})
export class AccountFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = 'سطح کاربری';
  accountId = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private mainService: MainService
  ) {
    super();
    this.accountId = route.snapshot.params['accountId'];
  }

  ngOnInit(): void {
    this.groupForm({});
    if (this.accountId) {
      this.mainService
        .get(ApiEndpoints.crypto.byId(this.accountId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: any) => {
            this.groupForm(response?.result);
          },
        });
    }
  }

  groupForm(data: any) {
    this.form = this.formBuilder.group({
      slug: [data?.slug, Validators.required],
      rate: [data?.rate, Validators.required],
      description: [data?.description],
      minPoint: [data?.minPoint, [Validators.required, Validators.min(0)]],
      maxPoint: [data?.maxPoint, [Validators.required, Validators.min(0)]],
      withdrawLimit: [
        data?.withdrawLimit,
        [Validators.required, Validators.min(0)],
      ],
      isDefault: [data?.isDefault ? true : false],
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
