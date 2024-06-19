import { User } from '../services';

export type UserSignInProps = Pick<User, 'email' | 'password'>;

export interface AuthStorageProps {
  isAuthenticated: boolean;
  lastAccess: Date;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  handleSignIn(user: UserSignInProps): void;
  handleSignOut(): void;
}
