import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CalendarSettingsService } from '@core/services/calendar-settings.service';
import moment from 'moment-jalaali';
import { DatepickerHeaderComponent } from './datepicker-header.component';
import { DynamicDateAdapter, JALALI_FORMATS } from './dynamic-date-adapter';

moment.loadPersian({ usePersianDigits: true, dialect: 'persian-modern' });

@Component({
  selector: 'app-datepicker',
  standalone: true,
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    DatepickerHeaderComponent,
    MatDatepicker,
  ],
  providers: [
    CalendarSettingsService,
    DynamicDateAdapter,
    { provide: DateAdapter, useExisting: DynamicDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: JALALI_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fa' },
  ],
})
export class DatepickerComponent {
  customHeader = DatepickerHeaderComponent;
  selectedDate!: string;
  minDate = moment('1100/01/01', 'jYYYY/jMM/jDD').locale('fa');
  maxDate = moment('1700/12/29', 'jYYYY/jMM/jDD').locale('fa');

  @Output() dateSelected = new EventEmitter<any>();
  @ViewChild('picker') datepicker!: MatDatepicker<any>;
  @Input() label = 'تاریخ';
  @Input() switchToGregorian = true;

  constructor(
    private calendarSettings: CalendarSettingsService,
    private adapter: DateAdapter<any>
  ) {
    adapter.setLocale('fa');
  }

  ngOnInit() {
    this.calendarSettings.setSwitchState(this.switchToGregorian);
  }

  get isJalali(): boolean {
    return (this.adapter as DynamicDateAdapter).isJalali;
  }

  onDateChange(event: any) {
    const date = event.value; // <--- اینجا اصلاح شد
    if (date) {
      const formatted = this.isJalali
        ? moment(date).format('jYYYY/jMM/jDD')
        : moment(date).format('YYYY/MM/DD');
      this.dateSelected.emit(formatted);
      console.log('Emitted:', formatted);
      this.selectedDate = formatted;
    }
  }

  onOpened() {
    const overlay = document.querySelector(
      '.cdk-overlay-container .mat-calendar-content'
    ) as HTMLElement;
    if (!overlay) return;

    // 🎨 اعمال استایل برای راست‌چین یا چپ‌چین بودن تقویم
    const observer = new MutationObserver(() => {
      overlay.style.direction = this.isJalali ? 'rtl' : 'ltr';
      overlay.style.fontFamily = this.isJalali
        ? `'Vazir', sans-serif`
        : `'Roboto', sans-serif'`;

      overlay.classList.toggle('rtl-calendar', this.isJalali);
      overlay.classList.toggle('ltr-calendar', !this.isJalali);
    });

    observer.observe(overlay, { childList: true, subtree: true });

    // وقتی تقویم بسته شد، observer رو پاک کن
    this.datepicker.closedStream.subscribe(() => observer.disconnect());

    // ✅ بخش کلیدی: کنترل محدوده‌ی سال‌ها
    // Angular Material به صورت پیش‌فرض فقط 20 سال قبل/بعد از activeDate نشون میده
    // ما activeDate رو میاریم به minDate تا بازه‌ی کامل دیده بشه
    const calendar = (this.datepicker as any).calendar;
    if (calendar && calendar.activeDate) {
      const activeYear = moment(calendar.activeDate).jYear();
      const minYear = this.minDate.jYear();

      // اگه activeDate خیلی جلوتر از محدوده باشه، تنظیمش کن روی minDate
      if (activeYear - minYear > 50) {
        calendar.activeDate = this.minDate.clone();
      }
    } else if (calendar) {
      // اگه هنوز مقدار نداشت، مستقیم minDate رو بذار
      calendar.activeDate = this.minDate.clone();
    }
  }
}
