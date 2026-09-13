import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CalendarSettingsService {
  private _switchToGregorian = new BehaviorSubject<boolean>(true);
  switchToGregorian$ = this._switchToGregorian.asObservable();

  setSwitchState(value: boolean) {
    this._switchToGregorian.next(value);
  }
}
