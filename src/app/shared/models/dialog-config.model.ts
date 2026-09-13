export interface IDialogConfig<T = any> {
  disableClose: boolean;
  autoFocus: boolean;
  minWidth: string;
  maxHeight: string;
  maxWidth: string;
  panelClass: string | string[];
  data: T;
}
