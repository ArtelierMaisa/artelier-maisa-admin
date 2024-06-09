import './styles/global.scss';

import { Flowbite } from 'flowbite-react';
import { Toaster } from 'sonner';

import { BannerCard } from './components';
import { flowtibeTheme } from './styles';
import { PRIMARY_LOGO } from './config';

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
        <BannerCard variant='fill' image={{id:"123", name:"Titulo", uri:PRIMARY_LOGO }}/>
      </Flowbite>
    </>
  );
}

export default App;
