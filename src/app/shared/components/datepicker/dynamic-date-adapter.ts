import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import moment from 'moment-jalaali';
import { JalaliDateAdapter } from './jalali-date-adapter';

export const JALALI_FORMATS = {
  parse: { dateInput: 'jYYYY/jMM/jDD' },
  display: {
    dateInput: 'jYYYY/jMM/jDD',
    monthYearLabel: 'jYYYY jMMMM',
    dateA11yLabel: 'jYYYY/jMM/jDD',
    monthYearA11yLabel: 'jYYYY jMMMM',
  },
};

@Injectable()
export class DynamicDateAdapter extends DateAdapter<moment.Moment> {
  private mode: 'jalali' | 'gregorian' = 'jalali';
  private jalali = new JalaliDateAdapter('fa');

 setCalendarMode(mode: 'jalali' | 'gregorian') {
  this.mode = mode;
  if (mode === 'jalali') {
    this.setLocale('fa');
    moment.loadPersian({ usePersianDigits: true, dialect: 'persian-modern' });
  } else {
    this.setLocale('en');
    moment.loadPersian({ usePersianDigits: false }); // اعداد لاتین
  }
}


  get isJalali(): boolean {
  return this.mode === 'jalali';
}

  override getYear(date: moment.Moment): number {
    return this.mode === 'jalali' ? date.jYear() : date.year();
  }

  override getMonth(date: moment.Moment): number {
    return this.mode === 'jalali' ? date.jMonth() : date.month();
  }

  override getDate(date: moment.Moment): number {
    return this.mode === 'jalali' ? date.jDate() : date.date();
  }

  override getMonthNames(): string[] {
    return this.mode === 'jalali'
      ? [
          'فروردین',
          'اردیبهشت',
          'خرداد',
          'تیر',
          'مرداد',
          'شهریور',
          'مهر',
          'آبان',
          'آذر',
          'دی',
          'بهمن',
          'اسفند',
        ]
      : moment.localeData('en').months();
  }

  override getDateNames(): string[] {
    return Array.from({ length: 31 }, (_, i) => String(i + 1));
  }

  // ستون هفته شمسی: شنبه = 0, یکشنبه = 1, ... جمعه = 6
  override getFirstDayOfWeek(): number {
    return this.mode === 'jalali' ? 0 : 1; // شنبه=0 برای شمسی، دوشنبه=0 برای میلادی
  }

override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
  if (this.mode === 'jalali') {
    const fullNames = ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];
    if (style === 'narrow') return fullNames.map(d => d.charAt(0));
    if (style === 'short') return fullNames.map(d => d.slice(0, 2));
    return fullNames;
  } else {
    // ستون‌ها: 0=Sunday ... 6=Saturday
    // نمایش: Monday ... Sunday، اما ستون‌ها دست نخورده
    const names = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const shortNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    
    if (style === 'narrow') return shortNames.map(d => d.charAt(0));
    if (style === 'short') return shortNames;
    return names;
  }
}

override getDayOfWeek(date: moment.Moment): number {
  if (this.mode === 'jalali') {
    // شمسی: شنبه=0 ... جمعه=6
    return (date.day() + 1) % 7; 
  } else {
    // میلادی: Sunday=0 ... Saturday=6
    return date.day();
  }
}



  override getYearName(date: moment.Moment): string {
    return this.mode === 'jalali' ? String(date.jYear()) : String(date.year());
  }

  override createDate(y: number, m: number, d: number): moment.Moment {
    return this.mode === 'jalali'
      ? moment().jYear(y).jMonth(m).jDate(d)
      : moment().year(y).month(m).date(d);
  }

  override today(): moment.Moment {
    return moment();
  }

  override parse(value: any, format?: string): moment.Moment | null {
    if (!value) return null;
    return this.mode === 'jalali'
      ? moment(value, format || 'jYYYY/jMM/jDD')
      : moment(value, format || 'YYYY/MM/DD');
  }

  override format(date: moment.Moment, displayFormat: string): string {
    return date ? date.format(displayFormat) : '';
  }

  override addCalendarYears(date: moment.Moment, years: number): moment.Moment {
    return this.mode === 'jalali'
      ? date.clone().add(years, 'jYear')
      : date.clone().add(years, 'year');
  }

  override addCalendarMonths(
    date: moment.Moment,
    months: number
  ): moment.Moment {
    return this.mode === 'jalali'
      ? date.clone().add(months, 'jMonth')
      : date.clone().add(months, 'month');
  }

  override addCalendarDays(date: moment.Moment, days: number): moment.Moment {
    return date.clone().add(days, 'day');
  }

  override toIso8601(date: moment.Moment): string {
    return date.clone().format('YYYY-MM-DD');
  }

  override deserialize(value: any): moment.Moment | null {
    if (!value) return null;
    return moment(value);
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
    if (this.mode === 'jalali') {
      // روش مطمئن برای شمسی: اول روز اول ماه بعد را بسازیم، سپس یک روز کم کنیم
      const nextMonth = date.clone().add(1, 'jMonth').startOf('jMonth');
      const lastDayOfMonth = nextMonth.clone().add(-1, 'day');
      return lastDayOfMonth.jDate();
    } else {
      // میلادی
      return date.daysInMonth();
    }
  }

  override clone(date: moment.Moment): moment.Moment {
    return date.clone();
  }
}
