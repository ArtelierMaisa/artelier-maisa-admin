import './styles/global.scss';

import { Flowbite } from 'flowbite-react';
import { Toaster } from 'sonner';

import { Container, EventModal } from './components';
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
        <div className='flex w-full h-screen'>
          <Container>
            <EventModal
              isOpen
              variant='edit'
              data={{
                description: 'Description',
                id: 'id',
                image: {
                  id: 'image',
                  name: 'Name Image',
                  uri: PRIMARY_LOGO,
                },
                name: 'Name',
              }}
            />
          </Container>
        </div>
      </Flowbite>
    </>
  );
}

export default App;
