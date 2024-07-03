export type SidebarCurrentPageType =
  | 'banners'
  | 'highlights'
  | 'about'
  | 'products';

export type SidebarCurrentPageUriType =
  | '/admin/banners'
  | '/admin/categories'
  | '/admin/events'
  | '/admin/about';

export interface SidebarCurrentPageAction {
  type: SidebarCurrentPageUriType;
  payload: SidebarCurrentPageType;
}

export interface SidebarCurrentPageState {
  currentPage: SidebarCurrentPageType;
}
