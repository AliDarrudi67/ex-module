import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-otp-input',
  standalone: true,
  imports: [NgOtpInputModule, CommonModule],
  templateUrl: './otp-input.component.html',
  styleUrl: './otp-input.component.scss',
})
export class OtpInputComponent implements AfterViewInit {
  timer: number = 60; // زمان تایمر به ثانیه
  timerSub: Subscription | null = null;
  showResend: boolean = false;
  @Output() onOtpChange = new EventEmitter<string>();
  @ViewChild('otpInput', { read: ElementRef }) otpInputRef!: ElementRef;

  constructor() {
    this.startTimer();
    console.log('as');
  }

  startTimer() {
    this.showResend = false;
    this.timer = 60;

    this.timerSub = interval(1000).subscribe(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.stopTimer();
        this.showResend = true;
      }
    });
  }

  stopTimer() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = null;
    }
  }

  resendOtp() {
    this.startTimer();
  }

  checkCode(data: string) {
    this.onOtpChange.emit(data);
  }

  ngAfterViewInit(): void {
    // مرحله کد تایید
    setTimeout(() => {
      const firstInput: HTMLInputElement | null =
        this.otpInputRef.nativeElement.querySelector('input');
      console.log(firstInput);

      if (firstInput) {
        firstInput.focus();
      }
    }, 100); // کمی تاخیر برای رندر شدن DOM
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
