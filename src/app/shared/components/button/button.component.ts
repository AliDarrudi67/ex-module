import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { ICON_REGISTRY, IconName } from '../icons/icon-registry';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() title = '';
  @Input() type: 'primary' | 'secondary' | 'ghost' | 'green-button' = 'primary';
  @Input() iconPosition: 'start' | 'end' = 'start';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() classList = '';

  private _icon: LucideIconData | null = null;

  @Input()
  set icon(value: IconName | LucideIconData | '' | null | undefined) {
    if (!value) {
      this._icon = null;
    } else if (typeof value === 'string') {
      this._icon = ICON_REGISTRY[value] ?? null;
      if (!this._icon) {
        console.warn(
          `[AppButtonComponent] icon "${value}" not found in ICON_REGISTRY`,
        );
      }
    } else {
      this._icon = value;
    }
  }

  get icon(): LucideIconData | null {
    return this._icon;
  }
}
