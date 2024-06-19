import { User } from '../services';

export type UserSignInProps = Pick<User, 'email' | 'password'>;

export interface AuthStorageProps {
  isAuthenticated: boolean;
  lastAccess: number;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  handleSignIn(user: UserSignInProps): Promise<void>;
  handleSignOut(): void;
}
