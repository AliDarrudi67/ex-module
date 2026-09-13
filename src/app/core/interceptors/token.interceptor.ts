import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MainService } from '../services/main.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private mainService: MainService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let accessToken = this.authService.getAccessToken();

    if (request.url.includes('set-role')) {
      accessToken = localStorage.getItem('jwt')!;
    }

    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request).pipe(
      tap((event) => {
        // ✅ موفقیت (فقط برای متدهایی که GET نیستند و آدرسشون pagination نداره)
        if (
          event instanceof HttpResponse &&
          request.method !== 'GET' &&
          !request.url.includes('pagination')
        ) {
          this.mainService.successToast('عملیات با موفقیت انجام شد');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.mainService.logout();
        } else if (error.status === 500) {
          this.mainService.errorToast('خطای سرور');
        } else {
          const msg = error?.error?.message;

          // اگر آرایه باشد
          if (Array.isArray(msg)) {
            msg.forEach((item: any) => {
              // اگر message تو هر آبجکت باشد
              this.mainService.errorToast(item?.msg || item);
            });

            // اگر استرینگ باشد
          } else if (typeof msg === 'string') {
            this.mainService.errorToast(msg);
          } else {
            this.mainService.errorToast('خطای ناشناخته');
          }
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    const method = request.method.toUpperCase();

    if (request.body instanceof FormData) {
      return request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      headers['Content-Type'] = 'application/json';
    }

    return request.clone({ setHeaders: headers });
  }
}
