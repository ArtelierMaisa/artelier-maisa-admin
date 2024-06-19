import { signInWithEmailAndPassword } from 'firebase/auth';
import { get, ref, set } from 'firebase/database';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { ExternalToast, toast } from 'sonner';

import {
  AuthContextProps,
  AuthStorageProps,
  User,
  UserSignInProps,
} from '../@types';
import { authenticate } from '../helpers/auth';
import { auth, database } from '../services';
import { AsyncStorage } from '../storage';

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: Required<PropsWithChildren>) {
  const toastOptions: ExternalToast = { duration: 7500 };
  const authStorage = AsyncStorage.get<AuthStorageProps>('auth');

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    authStorage ? authStorage.isAuthenticated : false,
  );

  function handleGenericErrorToast(): void {
    toast.error(
      'Falha no Login! Algo deu errado durante o login. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte técnico.',
      toastOptions,
    );
  }

  function handleAuthenticationErrorToast(): void {
    toast.error(
      'Usuário não encontrado! Desculpe, não conseguimos encontrar uma conta com esse nome de usuário. Por favor, verifique suas informações e tente novamente.',
      toastOptions,
    );
  }

  function isInsidePeriodAccess(lastAccess: number): boolean {
    const difference = Math.abs(lastAccess - new Date().getTime());
    const daysBetween = difference / (1000 * 60 * 60 * 24);
    return daysBetween <= 30;
  }

  // TODO: Add login with Firebase here!
  async function handleSignIn(user: UserSignInProps): Promise<boolean> {
    const currentTime = new Date().getTime();

    const loginRef = ref(database, 'user');
    const userSnapshot = await get(loginRef);

    if (!userSnapshot.exists()) {
      handleAuthenticationErrorToast();
      return false;
    }

    const userFirebase: User = Object.keys(userSnapshot.val()).map(() => ({
      ...userSnapshot.val(),
      lastAccess: currentTime,
    }))[0];

    const isUserAuthenticated = await authenticate(user, userFirebase);

    if (!isUserAuthenticated || !userFirebase) {
      handleAuthenticationErrorToast();
      return false;
    }

    const userToStorage: AuthStorageProps = {
      isAuthenticated: true,
      lastAccess: currentTime,
    };

    AsyncStorage.set<AuthStorageProps>('auth', userToStorage);
    setIsAuthenticated(true);

    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then(async () => {
        await set(loginRef, userFirebase).catch(handleGenericErrorToast);
      })
      .catch(handleGenericErrorToast);

    return true;
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
