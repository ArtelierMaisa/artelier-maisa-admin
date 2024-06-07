import './styles/global.scss';

import { GenericButton } from './components';
import { Flowbite } from 'flowbite-react';
import { flowbiteTheme } from './styles';

function App() {
  return (
    <Flowbite theme={{ theme: flowbiteTheme, mode: 'light' }}>
      <GenericButton title='Text' type='medium' variant='primary' />;
    </Flowbite>
  )
}

export default App;
