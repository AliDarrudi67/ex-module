import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthOption } from '@shared/models/auth/auth-option.model';

@Component({
  selector: 'app-auth-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-options.component.html',
  styleUrl: './auth-options.component.scss',
})
export class AuthOptionsComponent {
  @Input() options: AuthOption[] = [];
  @Output() optionSelected = new EventEmitter<string>();

  constructor(private sanitizer: DomSanitizer) {}

  safeIcon(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  select(id: string): void {
    this.optionSelected.emit(id);
  }
}
