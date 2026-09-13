import { IPaginationMeta } from '../pagination.model';

export interface IRoleListItem {
  roleId: string;
  slug: string;
  description: string;
  isDefault?: boolean; // چون بعضی آیتم‌ها نداشتن
  status: string;
  createdAt?: string | { $date: string }; // چون API اینطوری می‌فرسته
}

export interface IRoleListData {
  data: IRoleListItem[];
  metaData: IPaginationMeta;
}
