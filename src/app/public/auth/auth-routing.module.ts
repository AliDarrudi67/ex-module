import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GoogleSignupCallbackComponent } from './google-signup-callback/google-signup-callback.component';
import { RegisterComponent } from './register/register.component';
import { SetRoleComponent } from './set-role/set-role.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    component: AuthContainerComponent,
    children: [
      {
        path: 'login',
        component: SignInComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'forget-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'oauth-callback/signup',
        component: GoogleSignupCallbackComponent,
      },
      {
        path: 'oauth-callback/signin',
        component: GoogleSignupCallbackComponent,
      },
      {
        path: 'set-role',
        component: SetRoleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
