import './styles/global.scss';

import { Flowbite } from 'flowbite-react';
import { Toaster } from 'sonner';

import { Container, Dialog } from './components';
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
        <div className='flex w-full h-screen'>
          <Container>
            <Dialog
              data={{ id: '123', name: 'Test' }}
              isOpen
              variant='sign-out'
            />
          </Container>
        </div>
      </Flowbite>
    </>
  );
}

export default App;
