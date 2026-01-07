export enum PageRoute {
  HOME = '/',
  TECHNIQUE = '/teknik-dasar',
  PAGE_3 = '/page-3',
  PAGE_4 = '/page-4',
  PAGE_5 = '/page-5',
  PAGE_6 = '/page-6',
}

export interface NavItem {
  label: string;
  route: PageRoute;
  icon?: React.ReactNode;
}

export interface MachineType {
  id: string;
  name: string;
  description: string;
  bestFor: string;
  products: string[];
  iconName: 'printer' | 'layers' | 'image' | 'box';
}