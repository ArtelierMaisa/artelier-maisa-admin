import {
  Container,
  GenericButton,
  Icon,
  Product,
  SearchInput,
  Sidebar,
  Text,
} from '../../components';
import { PRIMARY_LOGO, SECONDARY_LOGO } from '../../config';

export function Categories() {
  // TODO: This categories and products are mocked. The category object has products list inside his.
  const categories = [0];
  const products = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <div className='flex w-full h-screen'>
      <Sidebar />

      <Container>
        <header className='flex flex-col w-full justify-center items-center mb-6 sm:mb-8 md:mb-0 gap-2'>
          <Text type='medium' toCenter>
            Cadastro de Produtos
          </Text>

          <Text size='sm' toCenter>
            Nesta página você pode criar categorias e dentro das categorias
            cadastrar, editar e excluir os seus produtos. Os produtos ficarão
            disponíveis para os seus usuários.
          </Text>
        </header>

        <Text className='hidden md:flex mt-8 mb-10 mx-auto gap-1 text-center'>
          Crie
          <span className='font-semibold text-base text-text'>categorias</span>
          para poder cadastrar os seus
          <span className='font-semibold text-base text-text'>produtos</span>
        </Text>

        <div className='flex flex-col lg:flex-row w-full justify-center items-center gap-4'>
          <SearchInput />

          <GenericButton title='Adicionar Nova Categoria' />
        </div>

        {/* TODO: Add correct logic to handle category list */}
        {categories.length > 0 ? (
          <div className='flex flex-col w-full mt-6 gap-2'>
            <div className='flex flex-col py-4 gap-2 border-y-2 border-y-primary'>
              <div className='flex w-full justify-between items-center'>
                <div className='flex gap-2'>
                  <Text type='semibold' color='primary' size='xl'>
                    Páscoa
                  </Text>

                  <button
                    type='button'
                    className='hover:opacity-90 transition-colors duration-300'
                  >
                    <Icon variant='pencil' color='primary' />
                  </button>
                </div>

                <button
                  type='button'
                  className='hover:opacity-90 transition-colors duration-300'
                >
                  <Icon variant='trash' color='primary' />
                </button>
              </div>

              <div className='flex flex-row w-full h-auto p-0.5 pb-2 gap-4 overflow-hidden overflow-x-auto scrollbar scrollbar-w-3 scrollbar-thumb-rounded-lg scrollbar-thumb-primary scrollbar-track-white-color'>
                <Product variant='blank' />

                {/* TODO: Add correct logic to handle product list */}
                {products.map(() => (
                  <Product
                    id='123'
                    variant='fill'
                    name='fill'
                    images={[
                      {
                        id: '123',
                        name: 'fill',
                        uri: PRIMARY_LOGO,
                      },
                      {
                        id: '456',
                        name: 'fill',
                        uri: SECONDARY_LOGO,
                      },
                    ]}
                    isOccult={false}
                  />
                ))}
              </div>
            </div>

            <div className='hidden md:flex flex-col items-center lg:items-start mt-4 gap-2'>
              <Text className='flex gap-1'>
                <Icon variant='info' color='primary' />
                Clique em
                <Icon variant='pencil' color='primary' />
                para editar uma categoria ou um produto.
              </Text>

              <Text className='flex gap-1'>
                <Icon variant='info' color='primary' />
                Clique em
                <Icon variant='trash' color='primary' />
                para excluir uma categoria ou um produto.
              </Text>
            </div>
          </div>
        ) : (
          <div className='flex flex-col w-full h-full justify-center items-center gap-1'>
            <Text type='medium' color='primary' className='max-w-60' toCenter>
              Você ainda não tem categorias e produtos cadastrados!
            </Text>

            <Icon variant='package' color='primary' size='medium' />
          </div>
        )}
      </Container>
    </div>
  );
}
