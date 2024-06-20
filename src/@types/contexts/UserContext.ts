import { About } from "../services";

export interface UserContextProps {
  about: About;
  handleGetAbout(): Promise<void>;
}
