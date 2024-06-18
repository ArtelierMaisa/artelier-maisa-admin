import { FormEvent, useState } from 'react';

import { GenericButton, Input } from '../../components';
import { SECONDARY_LOGO } from '../../config';

export function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // TODO: You should login with Firebase here!
  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  return (
    <main className='flex flex-col w-full h-screen bg-white justify-center items-center'>
      <form
        onSubmit={onSubmit}
        className='flex flex-col w-full md:w-[40rem] h-full md:h-auto justify-center items-center px-8 pb-8 sm:px-12 sm:pb-12 md:px-20 md:pb-20 pt-3 bg-background-color rounded-none md:rounded-lg md:shadow-default'
      >
        <img
          src={SECONDARY_LOGO}
          alt='Logo da Artelier'
          className='w-48 h-48 mb-3'
        />

        <div className='flex flex-col w-full items-center gap-4'>
          <Input
            id='input-email'
            value={email}
            variant='input'
            type='email'
            placeholder='E-mail'
            label='E-mail'
            mode='normal'
            maxLength={256}
            isHugWidth
            isRequired
            onChange={setEmail}
          />

          <Input
            id='input-password'
            value={password}
            variant='input'
            type='password'
            placeholder='Senha'
            label='Senha'
            mode='normal'
            isHugWidth
            isRequired
            onChange={setPassword}
          />
        </div>

        <div className='flex flex-col w-full justify-center mt-8 md:mt-12'>
          <GenericButton
            mode='submit'
            variant='primary'
            type='medium'
            title='Entrar'
            isHugWidth
          />
        </div>
      </form>
    </main>
  );
}
