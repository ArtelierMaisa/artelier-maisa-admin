import { useCallback, useEffect, useState } from 'react';
import { ExternalToast, toast } from 'sonner';

import {
  Categories as CategoriesData,
  Product as ProductData,
  ProductCreateProps,
  ProductModalAddDataProps,
} from '../../@types';
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
  const [productSelected, setProductSelected] = useState<ProductData>(
    {} as ProductData,
  );

  const {
    isLoaded,
    categories: categoriesFirebase,
    handleDeleteCategory,
    handleDeleteProduct,
    handleCreateCategory,
    handleCreateProduct,
    handlePutCategory,
    handleOccultProduct,
  } = useUser();

  const toastOptions: ExternalToast = { duration: 3000 };

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

    toast.success('Categoria foi excluída com sucesso!', toastOptions);

    setIsOpenCategoryDialog(false);
    setIsLoading(false);
    setCategorySelected({} as CategoriesData);
  }

  async function onDeleteProduct(): Promise<void> {
    setIsLoading(true);

    await handleDeleteProduct(categorySelected.id, productSelected.id);

    toast.success('Produto foi excluída com sucesso!', toastOptions);

    setIsOpenProductDialog(false);
    setIsLoading(false);
    setCategorySelected({} as CategoriesData);
    setProductSelected({} as ProductData);
  }

  async function onCreateOrPutCategory(
    name: string,
    type: 'add' | 'edit',
  ): Promise<void> {
    const categoryExists = !!categories.find(
      category =>
        category.name.toLowerCase().trim() === name.toLowerCase().trim(),
    );

    if (!name.trim() || categoryExists) {
      toast.error(
        'Ops! Para criar uma categoria deve ser informado um nome e ele deve ser único.',
        {
          duration: 7500,
        },
      );

      return;
    }

    setIsLoading(true);

    if (type === 'add') {
      await handleCreateCategory(name);

      toast.success('Categoria criada com sucesso!', toastOptions);
    } else {
      await handlePutCategory(categorySelected.id, name);

      toast.success('Nome da categoria foi editado com sucesso!', toastOptions);
    }

    setIsOpenCategoryModal(false);
    setIsLoading(false);
    setCategorySelected({} as CategoriesData);
  }

  async function onCreateProduct(
    newProduct: ProductModalAddDataProps,
  ): Promise<void> {
    setIsLoading(true);

    const product: ProductCreateProps = {
      categoryId: categorySelected.id,
      description: newProduct.description,
      files: newProduct.files,
      isOccult: newProduct.isOccult,
      material: newProduct.material,
      name: newProduct.name,
      price: newProduct.price,
      size: newProduct.size,
      weight: newProduct.weight,
      whatsapp: newProduct.whatsapp,
    };

    await handleCreateProduct(product);

    toast.success('Produto criada com sucesso!', toastOptions);

    setIsOpenProductModal(false);
    setIsLoading(false);
    setCategorySelected({} as CategoriesData);
  }

  const renderProducts = useCallback(
    (category: CategoriesData) =>
      category?.products &&
      category.products.map(product => {
        return (
          <Product
            id={product.id}
            key={product.id}
            variant='fill'
            images={product.images}
            isOccult={product.isOccult}
            name={product.name}
            onDelete={() => {
              setProductSelected(product);
              setCategorySelected(category);
              setIsOpenProductDialog(true);
            }}
            onCheck={async () =>
              await handleOccultProduct(category.id, product.id)
            }
          />
        );
      }),
    [handleOccultProduct],
  );

  useEffect(() => {
    if (!searchValue.trim()) setCategories(categoriesFirebase);
  }, [searchValue, categoriesFirebase]);

  useEffect(() => {
    if (categoriesFirebase.length) setCategories(categoriesFirebase);
    else setCategories([]);

    setCategorySelected({} as CategoriesData);
    setProductSelected({} as ProductData);
  }, [categoriesFirebase]);

  useEffect(() => {
    if (!isOpenCategoryModal && !isLoading)
      setCategorySelected({} as CategoriesData);
  }, [isOpenCategoryModal, isLoading]);

  useEffect(() => {
    if (!isOpenCategoryDialog && !isLoading)
      setCategorySelected({} as CategoriesData);
  }, [isOpenCategoryDialog, isLoading]);

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
                          onClick={() => {
                            setCategorySelected(category);
                            setIsOpenCategoryModal(true);
                          }}
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
                        onAdd={async () => {
                          setCategorySelected(category);
                          setIsOpenProductModal(true);
                        }}
                      />

                      {renderProducts(category)}
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
        onAccept={async () => await onDeleteCategory()}
        onClose={() => setIsOpenCategoryDialog(false)}
      />

      <CategoryModal
        isOpen={isOpenCategoryModal}
        variant={categorySelected?.id ? 'edit' : 'add'}
        isLoading={isLoading}
        data={categorySelected?.id ? categorySelected : undefined}
        onAccept={async name =>
          await onCreateOrPutCategory(
            name,
            categorySelected?.id ? 'edit' : 'add',
          )
        }
        onClose={() => setIsOpenCategoryModal(false)}
      />

      <Dialog
        isOpen={isOpenProductDialog}
        variant='product'
        isLoading={isLoading}
        onAccept={async () => await onDeleteProduct()}
        onClose={() => {
          setIsOpenProductDialog(false);
          setCategorySelected({} as CategoriesData);
          setProductSelected({} as ProductData);
        }}
      />

      <ProductModal
        isOpen={
          isOpenProductModal && !!categorySelected?.id && !productSelected?.id
        }
        variant='add'
        isLoading={isLoading}
        onAdd={async product => await onCreateProduct(product)}
        onClose={() => {
          setIsOpenProductModal(false);
          setCategorySelected({} as CategoriesData);
          setProductSelected({} as ProductData);
        }}
      />

      <ProductModal
        isOpen={
          isOpenProductModal && !!categorySelected?.id && !!productSelected?.id
        }
        variant='edit'
        isLoading={isLoading}
        data={productSelected?.id ? productSelected : undefined}
        onAdd={async product => await onCreateProduct(product)}
        onClose={() => {
          setIsOpenProductModal(false);
          setCategorySelected({} as CategoriesData);
          setProductSelected({} as ProductData);
        }}
      />
    </div>
  );
}
