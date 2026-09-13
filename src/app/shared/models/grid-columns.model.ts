export interface IGridColumn {
  field: string;
  header: string;
  visible?: boolean;
  masked?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  truncate?: boolean;
}
