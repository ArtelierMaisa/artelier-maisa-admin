import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Categories as CategoriesData } from '../../@types';
import {
  CategoryModal,
  Container,
  Dialog,
  GenericButton,
  Icon,
  Product,
  ProductModal,
  SearchInput,
  Sidebar,
  Spinner,
  Text,
} from '../../components';
import { useUser } from '../../hooks';

export function Categories() {
  const [isOpenCategoryDialog, setIsOpenCategoryDialog] =
    useState<boolean>(false);
  const [isOpenProductDialog, setIsOpenProductDialog] =
    useState<boolean>(false);
  const [isOpenCategoryModal, setIsOpenCategoryModal] =
    useState<boolean>(false);
  const [isOpenProductModal, setIsOpenProductModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [categories, setCategories] = useState<CategoriesData[]>([]);
  const [categorySelected, setCategorySelected] = useState<CategoriesData>(
    {} as CategoriesData,
  );

  const {
    isLoaded,
    categories: categoriesFirebase,
    handleDeleteCategory,
    handleCreateCategory,
  } = useUser();

  function onSearch(): void {
    const categoriesSearched = searchValue.trim()
      ? categoriesFirebase.filter(category =>
          searchValue
            .trim()
            .toLowerCase()
            .includes(category.name.trim().toLowerCase()),
        )
      : categoriesFirebase;

    setCategories(categoriesSearched);
  }

  async function onDeleteCategory(): Promise<void> {
    setIsLoading(true);

    await handleDeleteCategory(categorySelected.id);

    setIsOpenCategoryDialog(false);
    setIsLoading(false);
    setCategorySelected({} as CategoriesData);
  }

  async function onCreateCategory(name: string): Promise<void> {
    const categoryExists = !!categories.find(
      category =>
        category.name.toLowerCase().trim() === name.toLowerCase().trim(),
    );

    if (!name || categoryExists) {
      toast.error(
        'Ops! Para criar uma categoria deve ser informado um nome e ele deve ser único.',
        {
          duration: 7500,
        },
      );

      return;
    }

    setIsLoading(true);

    await handleCreateCategory(name);

    setIsOpenCategoryModal(false);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!searchValue.trim()) setCategories(categoriesFirebase);
  }, [searchValue, categoriesFirebase]);

  useEffect(() => {
    if (categoriesFirebase.length) setCategories(categoriesFirebase);
    else setCategories([]);
  }, [categoriesFirebase]);

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

        {isLoaded ? (
          <>
            <Text className='hidden md:flex mt-8 mb-10 mx-auto gap-1 text-center'>
              Crie
              <span className='font-semibold text-base text-text'>
                categorias
              </span>
              para poder cadastrar os seus
              <span className='font-semibold text-base text-text'>
                produtos
              </span>
            </Text>

            <div className='flex flex-col lg:flex-row w-full justify-center items-stretch md:items-center mb-6 gap-4'>
              <SearchInput
                searchValue={searchValue}
                onChange={event => setSearchValue(event.target.value)}
                onSearch={onSearch}
              />

              <GenericButton
                title='Adicionar Nova Categoria'
                onClick={() => setIsOpenCategoryModal(true)}
              />
            </div>

            {categories.length === 0 && (
              <div className='flex flex-col w-full h-full justify-center items-center gap-1'>
                <Text
                  type='medium'
                  color='primary'
                  className='max-w-60'
                  toCenter
                >
                  Você ainda não tem categorias e produtos cadastrados!
                </Text>

                <Icon variant='package' color='primary' size='medium' />
              </div>
            )}

            {categories.length > 0 &&
              categories.map((category, index) => (
                <div
                  key={category.id}
                  className={`flex flex-col w-full gap-2 ${index === 0 ? 'border-t-2' : ''} border-t-primary`}
                >
                  <div className='flex flex-col py-4 gap-2 border-b-2 border-b-primary'>
                    <div className='flex w-full justify-between items-center'>
                      <div className='flex gap-2'>
                        <Text type='semibold' color='primary' size='xl'>
                          {category.name}
                        </Text>

                        <button
                          type='button'
                          className='rounded-lg hover:opacity-90 transition-colors duration-300 focus:outline-none focus:ring focus:ring-primary60 focus:border-primary60'
                          onClick={() => setIsOpenCategoryModal(true)}
                        >
                          <Icon variant='pencil' color='primary' />
                        </button>
                      </div>

                      <button
                        type='button'
                        className='rounded-lg hover:opacity-90 transition-colors duration-300 focus:outline-none focus:ring focus:ring-primary60 focus:border-primary60'
                        onClick={() => {
                          setCategorySelected(category);
                          setIsOpenCategoryDialog(true);
                        }}
                      >
                        <Icon variant='trash' color='primary' />
                      </button>
                    </div>

                    <div className='flex flex-row w-full h-auto p-1 md:p-0.5 pb-1.5 md:pb-2 gap-4 overflow-hidden overflow-x-auto scrollbar scrollbar-w-3 scrollbar-thumb-rounded-lg scrollbar-thumb-primary scrollbar-track-white-color'>
                      <Product
                        variant='blank'
                        onAdd={() => setIsOpenProductModal(true)}
                      />

                      {category?.products &&
                        category.products.map(product => (
                          <Product
                            key={product.id}
                            variant='fill'
                            {...product}
                            onDelete={() => setIsOpenProductDialog(true)}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              ))}

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
          </>
        ) : (
          <div className='flex flex-col w-full h-full gap-2 justify-center items-center'>
            <Text color='primary' type='medium' toCenter>
              Estamos carregando os seus produtos...
            </Text>

            <Spinner />
          </div>
        )}
      </Container>

      <Dialog
        isOpen={isOpenCategoryDialog}
        variant='category'
        isLoading={isLoading}
        data={categorySelected}
        onAccept={async () => await onDeleteCategory()}
        onClose={() => {
          setCategorySelected({} as CategoriesData);
          setIsOpenCategoryDialog(false);
        }}
      />

      {/* TODO: You must change to `edit` when a category is selected */}
      <CategoryModal
        isOpen={isOpenCategoryModal}
        variant='add'
        isLoading={isLoading}
        data={categorySelected}
        onAccept={async name => await onCreateCategory(name)}
        onClose={() => setIsOpenCategoryModal(false)}
      />

      <Dialog
        isOpen={isOpenProductDialog}
        variant='product'
        onAccept={() => setIsOpenProductDialog(false)}
        onClose={() => setIsOpenProductDialog(false)}
      />

      {/* TODO: You must change to `edit` when a product is selected */}
      <ProductModal
        isOpen={isOpenProductModal}
        variant='add'
        onAdd={() => setIsOpenProductModal(false)}
        onClose={() => setIsOpenProductModal(false)}
      />
    </div>
  );
}
