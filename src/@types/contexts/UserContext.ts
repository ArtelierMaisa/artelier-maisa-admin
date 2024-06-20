import { About, Banner, Highlight } from "../services";

export interface UserContextProps {
  about: About;
  banners: Banner[];
  highlights: Highlight[];
  handleGetHighlights(): Promise<void>;
  handleGetBanners(): Promise<void>;
  handleGetAbout(): Promise<void>;
}
