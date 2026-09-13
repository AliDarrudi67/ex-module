import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthOptionsComponent } from '@shared/components/auth-options/auth-options.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';
import { AuthOption } from '@shared/models/auth/auth-option.model';
import { ArrowRight, Lock, LucideAngularModule, User } from 'lucide-angular';
const AUTH_OPTIONS: AuthOption[] = [
  {
    id: 'mobile',
    title: 'شماره موبایل',
    subtitle: 'ورود با شماره موبایل',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="2" width="10" height="20" rx="2" stroke="#fff" stroke-width="1.5"/><path d="M11 18h2" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  },
  {
    id: 'google',
    title: 'Google',
    subtitle: 'ورود با گوگل',
    iconSvg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3Z" fill="#4285F4"/><path d="M12 22c2.7 0 5-.9 6.6-2.5l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" fill="#34A853"/><path d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9l3.3-2.6Z" fill="#FBBC05"/><path d="M12 6.1c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 3.1 14.7 2 12 2A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.9 9.4 6.1 12 6.1Z" fill="#EA4335"/></svg>`,
  },

  {
    id: 'wallet-connect',
    title: 'WalletConnect',
    subtitle: 'اتصال با کیف پول',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 9.9c3-2.9 7.9-2.9 10.9 0l.4.3-1.3 1.3-.5-.5c-2.1-2-5.4-2-7.5 0l-.6.6L6 10.8l.5-.9Zm13.4 2.5 1.2 1.1-5.3 5.2-3.8-3.7-3.8 3.7L1.9 14l1.2-1.1 3.8 3.7 3.8-3.7 3.8 3.7 3.4-3.6Z" fill="#fff"/></svg>`,
  },
];

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    InputComponent,
    ButtonComponent,
    AuthOptionsComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  readonly userIcon = User;
  readonly lockIcon = Lock;
  readonly arrowRightIcon = ArrowRight;
  readonly authOptions = AUTH_OPTIONS;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  get usernameError(): string {
    const c = this.form.controls['username'];
    return c.touched && c.hasError('required') ? 'نام کاربری را وارد کنید' : '';
  }

  get passwordError(): string {
    const c = this.form.controls['password'];
    return c.touched && c.hasError('required') ? 'رمز عبور را وارد کنید' : '';
  }

  handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
    // TODO: اتصال به auth service
  }

  handleAuthOption(id: string): void {
    console.log('auth option selected:', id);
  }
}
