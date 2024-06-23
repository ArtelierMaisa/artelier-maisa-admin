import { About, Banner, Categories, Highlight } from '../services';

export interface UserContextProps {
  about: About;
  banners: Banner[];
  highlights: Highlight[];
  categories: Categories[];
  handleDeleteHighlight(id: string): Promise<void>;
  handleDeleteBanner(id: string): Promise<void>;
  handleGetHighlights(): Promise<void>;
  handleGetBanners(): Promise<void>;
  handleGetAbout(): Promise<void>;
  handleGetCategories(): Promise<void>;
}
