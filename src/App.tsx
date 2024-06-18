import './styles/global.scss';

import { Flowbite } from 'flowbite-react';
import { Toaster } from 'sonner';

import { Router } from './routes';
import { flowtibeTheme } from './styles';

function App() {
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
        <Router />
      </Flowbite>
    </>
  );
}

export default App;
