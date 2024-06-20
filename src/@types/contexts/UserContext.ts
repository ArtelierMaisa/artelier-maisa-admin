import { About, Highlight } from "../services";

export interface UserContextProps {
  about: About;
  highlights: Highlight[];
  handleGetHighlights(): Promise<void>;
  handleGetAbout(): Promise<void>;
}
