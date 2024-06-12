import './styles/global.scss';

import { Flowbite } from 'flowbite-react';
import { Toaster } from 'sonner';

import { BannerCard, Container, Sidebar } from './components';
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
          <Sidebar />

          <Container>
            <BannerCard
              variant='fill'
              banner={{
                id: 'any_id',
                name: 'any_image',
                uri: 'https://firebasestorage.googleapis.com/v0/b/fir-test-53930.appspot.com/o/images%2Ffoto%20pro%20git.jpg?alt=media&token=3a48806a-efcd-4638-9c02-a29598b5e1f3',
              }}
            />
          </Container>
        </div>
      </Flowbite>
    </>
  );
}

export default App;
