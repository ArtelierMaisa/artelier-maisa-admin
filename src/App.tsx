import './styles/global.scss';

import { Flowbite } from 'flowbite-react';
import { Toaster } from 'sonner';

<<<<<<< HEAD
import { CategoryModal, Container, Login } from './components';
=======
import { Router } from './routes';
>>>>>>> 79e7aefa0399c57b7a6f18d5e88624569496c098
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
      
      <Container>
        <Login/>
      </Container> 
       <Flowbite theme={{ theme: flowtibeTheme, mode: 'light' }}>
        <div className='flex w-full h-screen'>
          <Router />
        </div>
      </Flowbite> 
    </>
  );
}

export default App;
