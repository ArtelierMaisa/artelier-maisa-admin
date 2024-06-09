import './styles/global.scss';

import { Flowbite } from 'flowbite-react';

import { ImageCard } from './components';
import { flowtibeTheme } from './styles';

function App() {
  return (
    <Flowbite theme={{ theme: flowtibeTheme, mode: 'light' }}>
      <ImageCard type='photo' onGetFile={file => console.log(file)} />
    </Flowbite>
  );
}

export default App;
