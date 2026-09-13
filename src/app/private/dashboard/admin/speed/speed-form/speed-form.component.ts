import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SPEED_LIST } from '@shared/enums/speed-list';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { FormFooterComponent } from '../../../layout/form-footer/form-footer.component';

@Component({
  selector: 'app-speed-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormContainerComponent,
    FormFooterComponent,
  ],
  templateUrl: './speed-form.component.html',
  styleUrl: './speed-form.component.scss',
})
export class SpeedFormComponent {
  form!: FormGroup;
  formTitle = 'سرعت';
  speedList = SPEED_LIST;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      slug: ['', Validators.required],
      rate: ['', Validators.required],
      type: ['', Validators.required],
      description: [''],
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
