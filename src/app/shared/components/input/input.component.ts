import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  Eye,
  EyeOff,
  LucideAngularModule,
  LucideIconData,
} from 'lucide-angular';
let nextId = 0;
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: 'text' | 'password' | 'email' | 'tel' | 'number' = 'text';
  @Input() leftIcon: LucideIconData | null = null;
  @Input() rightIcon: LucideIconData | null = null;
  @Input() showPasswordToggle = true;
  @Input() autocomplete = 'off';
  @Input() errorMessage = '';

  @Output() rightIconClick = new EventEmitter<void>();

  readonly inputId = `app-input-${nextId++}`;
  readonly eyeIcon = Eye;
  readonly eyeOffIcon = EyeOff;

  value = '';
  disabled = false;
  focused = signal(false);
  passwordVisible = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get inputType(): string {
    if (this.type !== 'password') return this.type;
    return this.passwordVisible() ? 'text' : 'password';
  }

  get isPasswordField(): boolean {
    return this.type === 'password' && this.showPasswordToggle;
  }

  get isFloating(): boolean {
    return this.focused() || !!this.value;
  }

  writeValue(value: string): void {
    this.value = value ?? '';
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  handleFocus(): void {
    this.focused.set(true);
  }

  handleBlur(): void {
    this.focused.set(false);
    this.onTouched();
  }

  togglePasswordVisibility(): void {
    this.passwordVisible.update((v) => !v);
  }

  handleRightIconClick(): void {
    this.rightIconClick.emit();
  }
}
