import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BaseComponent } from '@shared/components/base/base.component';

import { ButtonComponent } from '@shared/components/buttons/button/button.component';

import { ApiEndpoints } from '@core/config/apiEndpoints';
import { MainService } from '@core/services/main.service';
import { IApiResponse } from '@shared/models/api-response.model';
import { IAuthCallbackParams } from '@shared/models/auth-callback.model';
import { IGoogleAuth } from '@shared/models/auth/google-auth.model';
import { IAuthTokenResult } from '@shared/models/auth/google-authenticate.model';

@Component({
  selector: 'app-google-signup-callback',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink],
  templateUrl: './google-signup-callback.component.html',
  styleUrl: './google-signup-callback.component.scss',
})
export class GoogleSignupCallbackComponent extends BaseComponent {
  pictureError = false;
  params: IAuthCallbackParams = {} as IAuthCallbackParams;

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((query) => {
      this.params = {
        status: query['status'],
        idToken: query['idToken'],
        email: query['email'],
        given_name: query['given_name'],
        family_name: query['family_name'],
        iss: query['iss'],
        sub: query['sub'],
        emailVerified: query['emailVerified'],
        picture: query['picture'] ? decodeURIComponent(query['picture']) : '',
        referralCode: query['referralCode'],
      };
    });
  }

  goToDashboard() {
    const passwordForm = JSON.parse(
      sessionStorage.getItem('passwordForm') ?? '{}'
    );

    const authorizationObj = this.mainService.removeEmptyFields({
      userName: passwordForm?.username ?? '',
      password: passwordForm?.password ?? '',
      confirmPassword: passwordForm?.confirmPassword ?? '',
    });

    const data: IGoogleAuth = {
      iso3: 'irn',
      jwtGoogle: this.params?.idToken,
      referralCode: this.params?.referralCode,
    };

    // فقط اگر authorization پر بود اضافه کن
    if (authorizationObj) {
      data.authorization = JSON.stringify(authorizationObj);
    }

    this.mainService
      .post<IApiResponse<IAuthTokenResult>>(
        ApiEndpoints.google.authenticate,
        data
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          localStorage.setItem('jwt', response?.result?.token);
          this.router.navigate(['/auth/set-role']);
        },
      });
  }

  onImageError($event: ErrorEvent) {
    this.pictureError = true;
  }
}
