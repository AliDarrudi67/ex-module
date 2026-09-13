import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { STATUS_LIST } from '@shared/enums/status-list';
import { TYPE_CALC_WITHDRAW_LIST } from '@shared/enums/type-calc-withdraw';
import { IDialogConfig } from '@shared/models/dialog-config.model';
import { ITypeCalcWithdraw } from '@shared/types/fee/type-calc-withdraw.type';
import { IStatusType } from '@shared/types/status.type';
import moment from 'moment-jalaali';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  baseUrl = environment.baseUrl;
  defaultDialogConfig: IDialogConfig = {
    disableClose: false,
    autoFocus: false,
    minWidth: '350px',
    maxHeight: '80vh',
    maxWidth: '95vw',
    panelClass: 'custom-dialog',
    data: {},
  };
  username = signal<string>('');
  userRole = signal<string>('');
  options = signal<any>([]);
  showSidebar = signal<boolean>(true);
  isVerified = signal<boolean>(false);
  userInfo = signal<any>({});
  sidebarItems: any[] = [];

  constructor(
    private matDialog: MatDialog,
    private http: HttpClient,
    private toast: ToastrService,
    private router: Router
  ) {}

  get<T>(endPoint: string, queryString: any = {}): Observable<any> {
    const params = Object.keys(queryString).length
      ? this.prepareQueryString(queryString)
      : undefined; // HttpClient وقتی undefined باشه، چیزی نمی‌فرسته

    return this.http.get(this.baseUrl + endPoint, { params });
  }

  getWithoutBaseUrl(endPoint: string, queryString: any = {}): Observable<any> {
    return this.http.get(endPoint, {
      params: this.prepareQueryString(queryString),
    });
  }

  prepareQueryString(queryString: any) {
    queryString = this.removeEmptyFields(queryString);
    let params = new HttpParams();
    const fields = Object.keys(queryString);

    fields.forEach((key) => {
      const value = queryString[key];

      // فقط وقتی اضافه کن که مقدار معتبر باشه
      if (
        value !== null &&
        value !== undefined &&
        value !== '' &&
        !(typeof value === 'string' && value.trim() === '') &&
        value !== -1
      ) {
        params = params.append(key, value);
      }
    });

    return params;
  }

  post<T>(
    endPoint: string,
    data: unknown,
    baseUrl: string = this.baseUrl
  ): Observable<T> {
    return this.http.post<T>(baseUrl + endPoint, this.removeEmptyFields(data));
  }

  put(
    endPoint: string,
    data: any,
    baseUrl: string = this.baseUrl
  ): Observable<any> {
    return this.http.put(baseUrl + endPoint, this.removeEmptyFields(data));
  }

  delete(endPoint: string): Observable<any> {
    return this.http.delete(this.baseUrl + endPoint);
  }

  getFormData(form: any, type = 'form') {
    let fields: any;
    if (type !== 'form') {
      fields = Object.keys(form);
      const formData = new FormData();
      fields.forEach((item: any) => {
        formData.append(item, form[item]);
      });
      return formData;
    } else {
      fields = Object.keys(form.value);
      const formData = new FormData();
      fields.forEach((item: any) => {
        formData.append(item, form.get(item).value);
      });
      return formData;
    }
  }

  getFormDataObject(object: any) {
    const fields = Object.keys(object);
    const formData = new FormData();

    fields.forEach((key) => {
      const value = object[key];
      // فقط مقادیر غیر null و غیر undefined و غیر خالی اضافه می‌کنیم
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value);
      }
    });

    return formData;
  }

  removeEmptyFields(obj: any): any {
    // اگر مقدار null، undefined، رشته خالی یا رشته‌ی 'undefined'/'null' بود
    if (
      obj === null ||
      obj === undefined ||
      obj === '' ||
      obj === 'undefined' ||
      obj === 'null'
    ) {
      return undefined;
    }

    // اگر مقدار اولیه غیرآبجکت بود (مثل عدد، بولین یا رشته)
    if (typeof obj !== 'object') return obj;

    // اگر آرایه بود
    if (Array.isArray(obj)) {
      const cleanedArray = obj
        .map((item) => this.removeEmptyFields(item))
        .filter((item) => item !== undefined);

      return cleanedArray.length > 0 ? cleanedArray : undefined;
    }

    // اگر آبجکت بود
    const newObj: any = {};
    Object.keys(obj).forEach((key) => {
      const value = this.removeEmptyFields(obj[key]);
      if (value !== undefined) newObj[key] = value;
    });

    // اگر بعد از تمیزکاری خالی شد، undefined برگردون
    return Object.keys(newObj).length > 0 ? newObj : undefined;
  }

  scrollToTop() {
    const header = document.querySelector('app-header'); // ← هدرتو پیدا کن
    if (header) {
      header.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // fallback
    }
  }

  successToast(text: string) {
    this.toast.success(text);
  }

  errorToast(text: string) {
    this.toast.error(text);
  }

  copyToClipboard(text: any) {
    if (!text) return;

    navigator.clipboard.writeText(text).then(
      () => {
        this.successToast('کپی شد');
      },
      (err) => {}
    );
  }

  getStatusTranslate(status: IStatusType) {
    return STATUS_LIST.find((item) => item.value == status)?.text;
  }

  getTypeCalcWithdrawTranslate(type: ITypeCalcWithdraw) {
    return TYPE_CALC_WITHDRAW_LIST.find((item) => item.value == type)?.text;
  }

  getStatusClass(status: 'ACTIVE' | 'DEACTIVE' | 'SUSPENDED') {
    return status == 'ACTIVE'
      ? 'text-green-600'
      : status == 'DEACTIVE'
      ? 'text-red-500'
      : status == 'SUSPENDED'
      ? 'text-yellow-500'
      : '';
  }

  decodeJwtPayload(token: string): any | null {
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = parts[1];
      // base64url -> base64
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      // padding
      const padded = base64.padEnd(
        base64.length + ((4 - (base64.length % 4)) % 4),
        '='
      );
      const json = atob(padded); // browser builtin
      return JSON.parse(json);
    } catch (e) {
      console.error('Invalid JWT:', e);
      return null;
    }
  }

  closeDialog() {
    this.matDialog.closeAll();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  convertToJalali(date: string | null | undefined): string {
    if (!date) return '-';

    return moment(date).format('jYYYY/jMM/jDD HH:mm');
  }
}
