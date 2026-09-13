import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LucideAngularModule } from 'lucide-angular';
import tags from 'lucide-static/tags.json';
import { debounceTime, tap } from 'rxjs/operators';
import { ButtonComponent } from '../buttons/button/button.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-lucide-icon-picker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    LucideAngularModule,
    LoadingComponent,
    ButtonComponent,
  ],
  templateUrl: './lucide-icon-picker.component.html',
  styleUrls: ['./lucide-icon-picker.component.scss'],
})
export class LucideIconPickerComponent implements OnInit {
  tags: Record<string, string[]> = tags as Record<string, string[]>;
  filteredIcons: string[] = [];
  searchControl = new FormControl('');
  isLoading = false; // وضعیت لودینگ

  commonIcons: string[] = [
    'user',
    'settings',
    'bell',
    'star',
    'heart',
    'search',
    'calendar',
    'lock',
    'camera',
    'pen',
  ];

  constructor(
    public dialogRef: MatDialogRef<LucideIconPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.filteredIcons = this.commonIcons;

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // صبر کن 300ms بعد سرچ
        tap(() => (this.isLoading = true)) // قبل از سرچ لودینگ فعال کن
      )
      .subscribe((value) => {
        const search = (value || '').toLowerCase().trim();

        if (!search) {
          this.filteredIcons = this.commonIcons;
          this.isLoading = false;
          return;
        }

        // فیلتر کردن آیکن‌ها
        this.filteredIcons = Object.keys(this.tags).filter((iconName) => {
          const tagList = this.tags[iconName] || [];
          return (
            iconName.toLowerCase().includes(search) ||
            tagList.some((tag) => tag.toLowerCase().includes(search))
          );
        });

        this.isLoading = false; // بعد از پردازش لودینگ غیر فعال می‌شود
      });
  }

  selectIcon(icon: string) {
    this.dialogRef.close(icon);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
