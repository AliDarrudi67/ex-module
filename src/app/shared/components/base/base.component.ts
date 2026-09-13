import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { FormFooterComponent } from '../../../private/dashboard/layout/form-footer/form-footer.component';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent {
  destroyRef = inject(DestroyRef);
  @ViewChild(FormFooterComponent) formFooterComponent!: FormFooterComponent;
}
