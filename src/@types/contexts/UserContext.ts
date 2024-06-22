import { About, Banner, Highlight } from "../services";

export interface UserContextProps {
  about: About;
  banners: Banner[];
  highlights: Highlight[];
  handleDeleteHighlight(id: string): Promise<void>;
  handleDeleteBanner(id: string): Promise<void>;
  handleGetHighlights(): Promise<void>;
  handleGetBanners(): Promise<void>;
  handleGetAbout(): Promise<void>;
}
