import './styles/global.scss';

import { Flowbite } from 'flowbite-react';
import { Toaster } from 'sonner';

import { Container, Product } from './components';
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
            <Product
              variant='fill'
              id='1234'
              name='Título'
              images={[
                {
                  id: '1234',
                  name: 'Título',
                  uri: 'https://picsum.photos/1000',
                },
                {
                  id: '1234',
                  name: 'Título',
                  uri: 'https://picsum.photos/1000',
                },
              ]}
              isOccult={false}
            />
          </Container>
        </div>
      </Flowbite>
    </>
  );
}

export default App;
