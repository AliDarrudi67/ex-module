import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { CalendarSettingsService } from '@core/services/calendar-settings.service';
import { IconArrowLeftComponent } from '../icons/icon-arrow-left/icon-arrow-left.component';
import { DynamicDateAdapter } from './dynamic-date-adapter';

@Component({
  selector: 'app-datepicker-header',
  standalone: true,
  imports: [IconArrowLeftComponent, CommonModule],
  template: `
    <div class="header-container">
      <button (click)="previousClicked()" class="rotate-180">
        <app-icon-arrow-left></app-icon-arrow-left>
      </button>

      <div class="header-label" (click)="toggleView()">{{ periodLabel }}</div>

      <button (click)="nextClicked()">
        <app-icon-arrow-left></app-icon-arrow-left>
      </button>

      <button
        mat-stroked-button
        *ngIf="isDayView && switchToGregorian"
        color="primary"
        class="switch-btn"
        (click)="toggleCalendar()"
      >
        {{ isJalali ? 'میلادی' : 'شمسی' }}
      </button>
    </div>
  `,
  styles: [
    `
      .header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 8px;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
      }
      .header-label {
        font-weight: 600;
        flex: 1;
        text-align: center;
      }
      .switch-btn {
        font-size: 11px;
        margin-left: 8px;
      }
    `,
  ],
})
export class DatepickerHeaderComponent<D> {
  @Output() calendarToggled = new EventEmitter<boolean>();
  @Input() switchToGregorian: boolean = true;

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    private settings: CalendarSettingsService,
    @Inject(MAT_DATE_LOCALE) public _locale: string
  ) {}

  ngOnInit() {
    this.settings.switchToGregorian$.subscribe(
      (value) => (this.switchToGregorian = value)
    );
  }

  get isJalali(): boolean {
    return (this._dateAdapter as unknown as DynamicDateAdapter).isJalali;
  }

  get isDayView(): boolean {
    return (this._calendar as any).currentView === 'month';
  }

  get periodLabel(): string {
    const date = this._calendar.activeDate;
    return (
      this._dateAdapter.getMonthNames('long')[
        this._dateAdapter.getMonth(date)
      ] +
      ' ' +
      this._dateAdapter.getYearName(date)
    );
  }

  previousClicked() {
    const view = (this._calendar as any).currentView;

    if (view === 'month') {
      // ماه قبل
      this._calendar.activeDate = this._dateAdapter.addCalendarMonths(
        this._calendar.activeDate,
        -1
      );
    } else if (view === 'year') {
      // سال قبل (در حالت انتخاب ماه)
      this._calendar.activeDate = this._dateAdapter.addCalendarYears(
        this._calendar.activeDate,
        -1
      );
    } else if (view === 'multi-year') {
      // 👇 وقتی در حالت انتخاب سال‌ها هستیم
      this._calendar.activeDate = this._dateAdapter.addCalendarYears(
        this._calendar.activeDate,
        -24 // چون هر صفحه ۲۴ سال نشون میده
      );
    }
  }

  nextClicked() {
    const view = (this._calendar as any).currentView;

    if (view === 'month') {
      this._calendar.activeDate = this._dateAdapter.addCalendarMonths(
        this._calendar.activeDate,
        1
      );
    } else if (view === 'year') {
      this._calendar.activeDate = this._dateAdapter.addCalendarYears(
        this._calendar.activeDate,
        1
      );
    } else if (view === 'multi-year') {
      // 👇 وقتی در حالت انتخاب سال‌ها هستیم
      this._calendar.activeDate = this._dateAdapter.addCalendarYears(
        this._calendar.activeDate,
        24
      );
    }
  }

  toggleCalendar() {
    const adapter = this._dateAdapter as unknown as DynamicDateAdapter;
    adapter.setCalendarMode(adapter.isJalali ? 'gregorian' : 'jalali');
    this._calendar.updateTodaysDate();
    this.calendarToggled.emit(adapter.isJalali);
  }

  toggleView() {
    // 👇 Calendar ViewType می‌تونه یکی از این‌ها باشه:
    // 'month', 'year', 'multi-year'
    const currentView = this._calendar.currentView;

    if (currentView === 'month') {
      this._calendar.currentView = 'multi-year'; // نمایش لیست سال‌ها
    } else if (currentView === 'multi-year') {
      this._calendar.currentView = 'month'; // بازگشت به ماه
    }
  }
}
