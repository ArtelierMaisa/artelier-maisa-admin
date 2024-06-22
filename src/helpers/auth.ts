import bcrypt from 'bcryptjs';

import { User, UserSignInProps } from '../@types';

export async function authenticate(user: UserSignInProps, userFirebase: User) {
  const isEmailValid = await bcrypt.compare(user.email, userFirebase.email);
  const isPasswordValid = await bcrypt.compare(
    user.password,
    userFirebase.password,
  );

  return isEmailValid && isPasswordValid;
}
