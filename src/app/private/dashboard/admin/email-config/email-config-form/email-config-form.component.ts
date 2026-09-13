import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { MainService } from '@core/services/main.service';
import { FormContainerComponent } from '@private/dashboard/layout/form-container/form-container.component';
import { FormFooterComponent } from '@private/dashboard/layout/form-footer/form-footer.component';
import { BaseComponent } from '@shared/components/base/base.component';
import { STATUS_LIST } from '@shared/enums/status-list';
import { TYPE_EMAIL } from '@shared/enums/type-email';
import { IApiResponse } from '@shared/models/api-response.model';
import { IEmailConfig } from '@shared/models/email-config/email-config.model';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-email-config-form',
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
    QuillModule,
    MatChipsModule,
  ],
  templateUrl: './email-config-form.component.html',
  styleUrl: './email-config-form.component.scss',
})
export class EmailConfigFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = '';
  statusList = STATUS_LIST;
  emailTypes = TYPE_EMAIL;
  loading = false;
  formLoading = false;
  readonly separatorKeys = [ENTER, COMMA] as const;

  // Quill modules
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formatting
      ['link', 'image', 'video'], // media
    ],
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IEmailConfig,
    private formBuilder: FormBuilder,
    public mainService: MainService
  ) {
    super();
    this.formTitle = 'تنظیمات ایمیل';
  }

  ngOnInit(): void {
    this.groupForm({});

    if (this.data?.emailConfigId) {
      this.formLoading = true;

      this.mainService
        .get(ApiEndpoints.emailConfig.byId(this.data?.emailConfigId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: IApiResponse<IEmailConfig>) => {
            this.formLoading = false;
            this.groupForm(response?.result);
          },
          error: () => {
            this.formLoading = false;
          },
        });
    }
  }

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) {
      const control = this.form.get('keysHtml');
      control?.setValue([...control.value, value]); // اضافه کردن به آرایه
    }
    event.chipInput!.clear();
  }

  remove(word: string) {
    const control = this.form.get('keysHtml');
    control?.setValue(control.value.filter((w: string) => w !== word));
  }

  get contentControl(): FormControl {
    return this.form.get('content') as FormControl;
  }

  groupForm(data: Partial<IEmailConfig>) {
    this.form = this.formBuilder.group({
      emailConfigId: [this.data?.emailConfigId],
      slug: [data?.slug, Validators.required],
      typeEmail: [data?.typeEmail, Validators.required],
      content: [data?.content], // Quill Editor کنترلش همینجاست
      keysHtml: [this.data?.keysHtml || []], // مقدار اولیه آرایه از سرور
    });
    console.log(this.data);

    if (this.data?.emailConfigId) {
      this.form.patchValue({ keysHtml: this.data.keysHtml || [] });
    } else {
      this.form.patchValue({ keysHtml: [] });
    }
  }

  onSubmit() {
    console.log(this.form.value);

    if (this.form.invalid) return;

    if (!this.form.value.content) {
      this.mainService.errorToast('لطفا محتوای ایمیل را وارد کنید');
      return;
    }

    this.loading = true;

    if (this.form.value?.emailConfigId) {
      // Update
      this.mainService
        .put(
          ApiEndpoints.emailConfig.byId(this.form.value?.emailConfigId),
          this.form.value
        )
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.loading = false;
            this.formFooterComponent.closeDialog();
          },
          error: () => {
            this.loading = false;
          },
        });
    } else {
      // Create
      this.mainService
        .post(ApiEndpoints.emailConfig.base, this.form.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.loading = false;
            this.formFooterComponent.closeDialog();
          },
          error: () => {
            this.loading = false;
          },
        });
    }
  }
}
