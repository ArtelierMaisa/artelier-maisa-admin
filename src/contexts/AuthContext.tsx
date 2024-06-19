import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import { AuthContextProps, AuthStorageProps, UserSignInProps } from '../@types';
import { AsyncStorage } from '../storage';

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: Required<PropsWithChildren>) {
  const authStorage = AsyncStorage.get<AuthStorageProps>('auth');

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    authStorage ? authStorage.isAuthenticated : false,
  );

  function isInsidePeriodAccess(lastAccess: Date): boolean {
    const difference = Math.abs(lastAccess.getTime() - new Date().getTime());
    const daysBetween = difference / (1000 * 60 * 60 * 24);
    return daysBetween <= 30;
  }

  // TODO: Add login with Firebase here!
  function handleSignIn(user: UserSignInProps): void {
    const currentDate = new Date();

    const userToStorage: AuthStorageProps = {
      isAuthenticated: true,
      lastAccess: currentDate,
    };

    AsyncStorage.set<AuthStorageProps>('auth', userToStorage);
    setIsAuthenticated(true);
  }

  function handleSignOut(): void {
    AsyncStorage.clearAll();
    setIsAuthenticated(false);
  }

  useEffect(() => {
    if (
      authStorage &&
      isAuthenticated &&
      !isInsidePeriodAccess(authStorage.lastAccess)
    ) {
      handleSignOut();
    }
  }, [authStorage, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleSignIn, handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
