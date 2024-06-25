import { EventModalAdd } from '../components';
import { About, AboutEdit, Banner, Categories, Highlight } from '../services';

export interface UserContextProps {
  isLoaded: boolean;
  about: About;
  banners: Banner[];
  highlights: Highlight[];
  categories: Categories[];
  handleDeleteCategory(id: string): Promise<void>;
  handleDeleteHighlight(id: string): Promise<void>;
  handleDeleteBanner(id: string): Promise<void>;
  handleGetHighlights(): Promise<void>;
  handleGetBanners(): Promise<void>;
  handleGetAbout(): Promise<void>;
  handleGetCategories(): Promise<void>;
  handlePutAbout(newAbout: AboutEdit): Promise<void>;
  handlePutBanner(id: string, file: File): Promise<void>;
  handleCreateBanner(file: File): Promise<void>;
  handleCreateCategory(name: string): Promise<void>;
  handleCreateHighlight(data: EventModalAdd): Promise<void>;
}
