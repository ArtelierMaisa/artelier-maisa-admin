import { Sidebar as FlowbiteSidebar } from 'flowbite-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import packageJson from '../../../package.json';
import { SidebarCurrentPageType } from '../../@types';
import { PRIMARY_LOGO } from '../../config';
import { AsyncStorage } from '../../storage';
import { Dialog, Icon, Text } from '../';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isOpenSignOutDialog, setIsOpenSignOutDialog] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] =
    useState<SidebarCurrentPageType>('banners');

  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleChangeCurrentPage(newPage: SidebarCurrentPageType): void {
    if (newPage !== currentPage) setCurrentPage(newPage);
  }

  function handleSignOutAccept() {
    AsyncStorage.clearAll();
    setIsOpenSignOutDialog(false);

    navigate('/', { replace: true });
  }

  const pathnames = useCallback(
    () =>
      ({
        '/admin/banners': () => setCurrentPage('banners'),
        '/admin/categories': () => setCurrentPage('products'),
        '/admin/events': () => setCurrentPage('highlights'),
        '/admin/about': () => setCurrentPage('about'),
      })[pathname],
    [pathname],
  );

  const isBanners = currentPage === 'banners';
  const isHighlights = currentPage === 'highlights';
  const isAbout = currentPage === 'about';
  const isProducts = currentPage === 'products';

  const width = isCollapsed ? 'w-auto' : 'w-full sm:w-auto';
  const textsClassName = `${isCollapsed ? 'hidden' : 'flex'} text-wrap`;

  useEffect(pathnames, [pathname, pathnames]);

  return (
    <>
      <aside className={`fixed sm:relative ${width} top-0 left-0 z-50`}>
        <FlowbiteSidebar
          aria-label='Menu lateral da Artelier Maisa'
          collapsed={isCollapsed}
        >
          <div className='flex w-full h-auto justify-between items-center mb-7'>
            <img
              src={PRIMARY_LOGO}
              alt='Logo da Artelier Maisa'
              className={isCollapsed ? 'hidden' : 'w-16 h-16'}
            />

            <Icon
              variant={isCollapsed ? 'list' : 'caret-left'}
              size='small'
              color='background-color'
              isCursorPointer
              onClick={() => setIsCollapsed(!isCollapsed)}
            />
          </div>

          <FlowbiteSidebar.ItemGroup>
            <Link
              to='/admin/banners'
              title='Cadastro de Banners de Boas Vindas'
              className='flex flex-row justify-start items-center rounded-lg p-1 gap-2 cursor-pointer focus:outline-none focus:ring focus:ring-background-color focus:border-background-color'
              onClick={() => handleChangeCurrentPage('banners')}
            >
              <Icon
                variant='image'
                size='small'
                color={isBanners ? 'white' : 'background-color'}
              />

              <Text
                type='semibold'
                color={isBanners ? 'white' : 'background-color'}
                className={textsClassName}
              >
                Cadastro de Banners de Boas Vindas
              </Text>
            </Link>

            <Link
              to='/admin/categories'
              title='Cadastro de Produtos'
              className='flex flex-row justify-start items-center rounded-lg p-1 gap-2 cursor-pointer focus:outline-none focus:ring focus:ring-background-color focus:border-background-color'
              onClick={() => handleChangeCurrentPage('products')}
            >
              <Icon
                variant='shopping-cart'
                size='small'
                color={isProducts ? 'white' : 'background-color'}
              />

              <Text
                type='semibold'
                color={isProducts ? 'white' : 'background-color'}
                className={textsClassName}
              >
                Cadastro de Produtos
              </Text>
            </Link>

            <Link
              to='/admin/events'
              title='Cadastro de Divulgações'
              className='flex flex-row justify-start items-center rounded-lg p-1 gap-2 cursor-pointer focus:outline-none focus:ring focus:ring-background-color focus:border-background-color'
              onClick={() => handleChangeCurrentPage('highlights')}
            >
              <Icon
                variant='palette'
                size='small'
                color={isHighlights ? 'white' : 'background-color'}
              />

              <Text
                type='semibold'
                color={isHighlights ? 'white' : 'background-color'}
                className={textsClassName}
              >
                Cadastro de Divulgações
              </Text>
            </Link>

            <Link
              to='/admin/about'
              title='Sobre a Maisa'
              className='flex flex-row justify-start items-center rounded-lg p-1 gap-2 cursor-pointer focus:outline-none focus:ring focus:ring-background-color focus:border-background-color'
              onClick={() => handleChangeCurrentPage('about')}
            >
              <Icon
                variant='address-book-tabs'
                size='small'
                color={isAbout ? 'white' : 'background-color'}
              />

              <Text
                type='semibold'
                color={isAbout ? 'white' : 'background-color'}
                className={textsClassName}
              >
                Sobre a Maisa
              </Text>
            </Link>

            <button
              title='Sair'
              className='flex flex-row justify-start items-center rounded-lg p-1 gap-2 cursor-pointer focus:outline-none focus:ring focus:ring-background-color focus:border-background-color'
              onClick={() => setIsOpenSignOutDialog(true)}
            >
              <Icon variant='sign-out' size='small' color='background-color' />

              <Text
                type='semibold'
                color='background-color'
                className={textsClassName}
              >
                Sair
              </Text>
            </button>
          </FlowbiteSidebar.ItemGroup>

          {!isCollapsed && (
            <div className='flex flex-grow justify-center items-end'>
              <Text color='background-color' size='sm' toCenter>
                Versão: {packageJson.version}
              </Text>
            </div>
          )}
        </FlowbiteSidebar>
      </aside>

      <Dialog
        isOpen={isOpenSignOutDialog}
        variant='sign-out'
        onAccept={handleSignOutAccept}
        onClose={() => setIsOpenSignOutDialog(false)}
      />
    </>
  );
}
