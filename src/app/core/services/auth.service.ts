import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MainService } from './main.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accessToken: string | null = null;

  constructor(private http: HttpClient, private mainService: MainService) {}

  checkToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return of(false);
    return of(true);
  }

  getAccessToken(): string | null {
    return this.accessToken || localStorage.getItem('token');
  }

  setTokens(access: string, refresh: string) {
    this.accessToken = access;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  }

  logout() {
    localStorage.clear();
    this.accessToken = null;
    // مسیر لاگین ریدایرکت کن
    window.location.href = '/auth/login';
  }
}
