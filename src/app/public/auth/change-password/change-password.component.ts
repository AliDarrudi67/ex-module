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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { BaseComponent } from '@shared/components/base/base.component';
import { LucideAngularModule } from 'lucide-angular';

import { ButtonComponent } from '@shared/components/buttons/button/button.component';

import { ApiEndpoints } from '@core/config/apiEndpoints';
import { MainService } from '@core/services/main.service';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';
import { NoPersianDirective } from '@shared/directives/no-persian.directive';
import { USER_STATUS } from '@shared/enums/user-status';
import { strongPasswordValidator } from '../register/register.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    ButtonComponent,
    FormsModule,
    NoPersianDirective,
    LucideAngularModule,
    TooltipComponent,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent extends BaseComponent {
  form!: FormGroup;
  hidePassword = true;
  setPasword = false;
  loading = false;

  constructor(
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super();
    this.groupForms();
  }

  groupForms() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, strongPasswordValidator]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;
      this.mainService
        .post(ApiEndpoints.user.changeAuthorization, this.form.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.loading = false;
            const status = localStorage.getItem('statusActivity');
            if (status == USER_STATUS.SET_PASSWORD)
              this.router.navigate(['/auth/profile']);
            else this.router.navigate(['/dashboard']);
          },
          error: () => {
            this.loading = false;
          },
        });
    }
  }
}
