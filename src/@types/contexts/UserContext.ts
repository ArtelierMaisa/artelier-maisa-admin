import { EventModalAdd } from '../components';
import {
  About,
  AboutEdit,
  Banner,
  Categories,
  Highlight,
  HighlightEdit,
  ProductCreateProps,
  ProductEditProps,
} from '../services';

export interface UserContextProps {
  isLoaded: boolean;
  about: About;
  banners: Banner[];
  highlights: Highlight[];
  categories: Categories[];
  handleDeleteCategory(id: string): Promise<void>;
  handleDeleteHighlight(id: string): Promise<void>;
  handleDeleteBanner(id: string): Promise<void>;
  handleDeleteProduct(categoryId: string, productId: string): Promise<void>;
  handleGetHighlights(): Promise<void>;
  handleGetBanners(): Promise<void>;
  handleGetAbout(): Promise<void>;
  handlePutAbout(newAbout: AboutEdit): Promise<void>;
  handlePutBanner(id: string, file: File): Promise<void>;
  handlePutCategory(id: string, name: string): Promise<void>;
  handlePutHighlight(newHighlight: HighlightEdit): Promise<void>;
  handlePutProduct(newProduct: ProductEditProps): Promise<void>;
  handleOccultProduct(categoryId: string, productId: string): Promise<void>;
  handleCreateBanner(file: File): Promise<void>;
  handleCreateCategory(name: string): Promise<void>;
  handleCreateHighlight(data: EventModalAdd): Promise<void>;
  handleCreateProduct(newProduct: ProductCreateProps): Promise<void>;
}

export type Image = {
  id: string;
  name: string;
  uri: string;
};
