import './styles/global.scss';

import { ImageCard } from './components';
import { Flowbite } from 'flowbite-react';
import { flowbiteTheme } from './styles';

function App() {
  return (
    <Flowbite theme={{ theme: flowbiteTheme, mode: 'light' }}>
      <div className='mt-4 ml-4'>
        <ImageCard type='photo' />
      </div>
    </Flowbite>
  )
}

export default App;
