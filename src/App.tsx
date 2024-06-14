import './styles/global.scss';

import { Flowbite } from 'flowbite-react';
import { Toaster } from 'sonner';

import { CategoryModal, Container } from './components';
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
            <CategoryModal
              data={{ id: '123', name: 'Test' }}
              isOpen
              variant='edit'
            />
          </Container>
        </div>
      </Flowbite>
    </>
  );
}

export default App;
