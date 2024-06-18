import { useNavigate } from 'react-router-dom';

import { GenericButton, Text } from '../../components';
import { PRIMARY_LOGO } from '../../config';

export function NotFound() {
  const navigate = useNavigate();

  // TODO: Navigate admin to "Banners" page when admin is logged. Admin must be redirected to the "Login" page when does not logged.
  function goToInitialPage(): void {
    navigate('/');
  }

  return (
    <div className='flex flex-row w-full h-screen'>
      <aside className='hidden lg:flex flex-col flex-1 justify-center items-center bg-primary p-8 xl:px-32 gap-8'>
        <img src={PRIMARY_LOGO} alt='Logo da Artelier' className='w-40 h-40' />

        <Text type='semibold' size='4xl' color='background-color' toCenter>
          Opa! Página não encontrada
        </Text>

        <Text type='medium' size='xl' color='background-color' toCenter>
          Parece que você encontrou um caminho que não existe mais!
        </Text>
      </aside>

      <main className='flex flex-col flex-1 justify-center items-center bg-background-color p-8 md:px-16 xl:px-32 gap-8'>
        <Text type='medium' size='xl' color='primary' toCenter>
          Volte para a página inicial ou use a barra de busca para encontrar o
          que procura.
        </Text>

        <GenericButton title='Voltar ao Início' onClick={goToInitialPage} />
      </main>
    </div>
  );
}
