import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { MainService } from '@core/services/main.service';
import { BaseComponent } from '@shared/components/base/base.component';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { USER_STATUS } from '@shared/enums/user-status';
import { IApiResponse } from '@shared/models/api-response.model';
import { IJwtRole } from '@shared/models/auth/jwt.model';
import { ISetRole } from '@shared/models/auth/set-role.model';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-set-role',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    LoadingComponent,
    ButtonComponent,
  ],
  templateUrl: './set-role.component.html',
  styleUrl: './set-role.component.scss',
})
export class SetRoleComponent extends BaseComponent implements OnInit {
  loading = false;
  userRoles: IJwtRole[] = [];

  constructor(private mainService: MainService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.decodeToken();
  }

  decodeToken() {
    this.userRoles = this.mainService.decodeJwtPayload(
      localStorage.getItem('jwt')!!
    )?.roles;

    if (this.userRoles.length == 1) {
      this.onRoleSelected(this.userRoles[0]);
    }
  }

  onRoleSelected(role: IJwtRole) {
    this.loading = true;
    const data = { roleId: role?.rowId };
    this.mainService
      .post<IApiResponse<ISetRole>>(ApiEndpoints.user.setRole, data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.loading = false;
          localStorage.setItem('token', response?.result?.token);
          localStorage.setItem(
            'statusActivity',
            response?.result?.statusActivity
          );
          const status = response?.result?.statusActivity;
          if (status == USER_STATUS.CHANGE_PASSWORD)
            this.router.navigate(['/auth/change-password']);
          else if (status == USER_STATUS.PROFILE_INCOMPLETE)
            this.router.navigate(['/auth/profile']);
          else if (status == USER_STATUS.SET_PASSWORD)
            this.router.navigate(['/auth/change-password']);
          else this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.loading = false;
        },
      });
  }
}
