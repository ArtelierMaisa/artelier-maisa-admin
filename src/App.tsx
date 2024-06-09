import './styles/global.scss';

import { Flowbite } from 'flowbite-react';
import { Toaster } from 'sonner';

import { BannerCard } from './components';
import { PRIMARY_LOGO } from './config';
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
        <BannerCard banner={{ id: '123', name: 'Banner', uri: PRIMARY_LOGO }} />
      </Flowbite>
    </>
  );
}

export default App;
