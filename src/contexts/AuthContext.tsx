import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import { AuthContextProps, AuthStorageProps, User, UserSignInProps } from '../@types';
import { AsyncStorage } from '../storage';
import { ref, get, set } from 'firebase/database';
import { auth, database } from '../services';
import { toast } from 'sonner';
import { authenticate } from '../helpers/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: Required<PropsWithChildren>) {
  const authStorage = AsyncStorage.get<AuthStorageProps>('auth');

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    authStorage ? authStorage.isAuthenticated : false,
  );

  function isInsidePeriodAccess(lastAccess: number): boolean {
    const difference = Math.abs(lastAccess - new Date().getTime());
    const daysBetween = difference / (1000 * 60 * 60 * 24);
    return daysBetween <= 30;
  }

  async function handleSignIn(user: UserSignInProps): Promise<boolean> {
    const currentDate = new Date();

    const loginRef = ref(database, 'user');
    const userSnapshot = await get(loginRef);

    if (!userSnapshot.exists()) {
      toast.error('Usuário não encontrado! Desculpe, não conseguimos encontrar uma conta com esse nome de usuário. Por favor, verifique suas informações e tente novamente.', {
        duration: 7500,
      });

      return false;
    }

    const userFirebase: User = Object.keys(userSnapshot.val()).map(_ => ({
      ...userSnapshot.val(),
      lastAccess: currentDate.getTime()
    }))[0];

    const isUserAuthenticated = await authenticate(user, userFirebase);

    if (!isUserAuthenticated || !userFirebase) {
      toast.error('Falha no Login! Algo deu errado durante o login. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte técnico.', {
        duration: 7500,
      });

      return false;
    }

    const userToStorage: AuthStorageProps = {
      isAuthenticated: true,
      lastAccess: currentDate.getTime(),
    };

    AsyncStorage.set<AuthStorageProps>('auth', userToStorage);
    setIsAuthenticated(true);

    if (isAuthenticated) {
      await signInWithEmailAndPassword(auth, user.email, user.password).then(async (_) => {
        await set(loginRef, userFirebase).then(() => { }).catch((error) => {
          console.error(error)
          toast.error('Falha no Login! Algo deu errado durante o login. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte técnico.', {
            duration: 7500,
          });
        })
      }).catch((error) => {
        console.error(error)
        toast.error('Falha no Login! Algo deu errado durante o login. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte técnico.', {
          duration: 7500,
        });
      })
    }

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
