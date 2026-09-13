// src/app/shared/jalali-date-adapter.ts
import { Inject, Injectable, Optional } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import moment from 'moment-jalaali';

// فعال‌سازی فارسی و اعداد فارسی
moment.loadPersian({ usePersianDigits: true, dialect: 'persian-modern' });

@Injectable()
export class JalaliDateAdapter extends DateAdapter<moment.Moment> {
  constructor(@Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: string) {
    super();
    moment.locale('fa');
    this.setLocale(matDateLocale || 'fa');
  }

  override getYear(date: moment.Moment): number {
    return date.jYear();
  }

  override getMonth(date: moment.Moment): number {
    return date.jMonth();
  }

  override getDate(date: moment.Moment): number {
    return date.jDate();
  }

  override getDayOfWeek(date: moment.Moment): number {
    return date.day();
  }

  override getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
  // همیشه ۱۲ ماه کامل فارسی
  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 
    'مرداد', 'شهریور', 'مهر', 'آبان', 
    'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  // if (style === 'short' || style === 'narrow') {
  //   // اگر میخوای فقط حرف اول باشه:
  //   return months.map(m => m.charAt(0));
  // }
  return months; // style = long
}


  override getDateNames(): string[] {
    return Array.from({ length: 31 }, (_, i) => String(i + 1));
  }

  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const days = moment.localeData('fa').weekdays(); // ["یکشنبه", "دوشنبه", ...]
    return days.map((d) => d.charAt(0)); // ["ی", "د", "س", "چ", "پ", "ج", "ش"]
  }

  override getYearName(date: moment.Moment): string {
    return String(date.jYear());
  }

  override getFirstDayOfWeek(): number {
    // در ایران هفته از شنبه شروع می‌شود => مقدار 6
    return 6;
  }

  override createDate(jy: number, jm: number, jd: number): moment.Moment {
    if (jm < 0 || jm > 11) throw Error(`Invalid month index "${jm}"`);
    if (jd < 1) throw Error(`Invalid date "${jd}"`);

    const m = moment().jYear(jy).jMonth(jm).jDate(jd);
    if (!m.isValid())
      throw Error(`Invalid Jalaali date: ${jy}/${jm + 1}/${jd}`);
    return m;
  }

  override today(): moment.Moment {
    return moment();
  }

  override parse(value: any): moment.Moment | null {
    if (!value) return null;
    if (moment.isMoment(value)) return value;
    const parsed = moment(value, 'jYYYY/jMM/jDD');
    return parsed.isValid() ? parsed : null;
  }

  override format(date: moment.Moment, displayFormat: string): string {
    return date ? date.format(displayFormat) : '';
  }

  override addCalendarYears(date: moment.Moment, years: number): moment.Moment {
    return date.clone().add(years, 'jYear');
  }

  override addCalendarMonths(
    date: moment.Moment,
    months: number
  ): moment.Moment {
    return date.clone().add(months, 'jMonth');
  }

  override addCalendarDays(date: moment.Moment, days: number): moment.Moment {
    return date.clone().add(days, 'day');
  }

  override toIso8601(date: moment.Moment): string {
    return date.clone().format('YYYY-MM-DD');
  }

  override deserialize(value: any): moment.Moment | null {
    if (!value) return null;
    if (moment.isMoment(value)) return value;

    let m = moment(value, moment.ISO_8601);
    if (m.isValid()) return m;
    m = moment(value, 'jYYYY/jMM/jDD');
    return m.isValid() ? m : null;
  }

  override isDateInstance(obj: any): boolean {
    return moment.isMoment(obj);
  }

  override isValid(date: moment.Moment): boolean {
    return date.isValid();
  }

  override invalid(): moment.Moment {
    return moment.invalid();
  }

  override getNumDaysInMonth(date: moment.Moment): number {
    const m = date.clone();
    // @ts-ignore
    if (typeof m.jDaysInMonth === 'function') return m.jDaysInMonth();
    const nextMonth = this.createDate(date.jYear(), date.jMonth(), 1)
      .clone()
      .add(1, 'jMonth');
    const lastDay = nextMonth.clone().add(-1, 'day');
    return lastDay.jDate();
  }

  override clone(date: moment.Moment): moment.Moment {
    return date.clone();
  }
}
