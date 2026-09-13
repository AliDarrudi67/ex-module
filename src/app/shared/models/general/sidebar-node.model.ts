export interface ISidebarNode {
  title: string;
  slug?: string;
  icon: string;
  route?: string;
  children?: ISidebarNode[];
  open?: boolean;
}
