import './styles/global.scss';

import { Flowbite } from 'flowbite-react';
import { useState } from 'react';

import { Input } from './components';
import { flowtibeTheme } from './styles';

function App() {
  const [value, setValue] = useState<string>('');

  return (
    <Flowbite theme={{ theme: flowtibeTheme, mode: 'light' }}>
      <Input
        value={value}
        placeholder='Digite seu e-mail'
        onChange={setValue}
        variant='textarea'
        type='email'
        label='E-mail'
      />
    </Flowbite>
  );
}

export default App;
