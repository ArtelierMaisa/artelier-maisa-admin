import './styles/global.scss';

import { Flowbite } from 'flowbite-react';
import { useState } from 'react';
import { Toaster } from 'sonner';

import { Switch } from './components';
import { flowtibeTheme } from './styles';

function App() {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <>
      <Toaster
        position='bottom-right'
        duration={5000}
        closeButton
        richColors
        expand
      />

      <Flowbite theme={{ theme: flowtibeTheme, mode: 'light' }}>
        <Switch checked={isChecked} onToggle={setIsChecked} variant='neutral' />
      </Flowbite>
    </>
  );
}

export default App;
