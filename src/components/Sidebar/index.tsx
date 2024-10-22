import { Sidebar as FlowbiteSidebar } from 'flowbite-react';
import { memo, useReducer, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import packageJson from '../../../package.json';
import {
  SidebarCurrentPageAction,
  SidebarCurrentPageState,
  SidebarCurrentPageType,
  SidebarCurrentPageUriType,
} from '../../@types';
import { PRIMARY_LOGO } from '../../config';
import { useAuth } from '../../hooks';
import { Dialog, Icon, Text } from '../';

const isMobile = window.innerWidth <= 640;

function reducer(
  state: SidebarCurrentPageState,
  action: SidebarCurrentPageAction,
): SidebarCurrentPageState {
  const { type, payload } = action;
  switch (type) {
    case '/admin/about': {
      return { ...state, currentPage: payload };
    }
    case '/admin/categories': {
      return { ...state, currentPage: payload };
    }
    case '/admin/banners': {
      return { ...state, currentPage: payload };
    }
    case '/admin/events': {
      return { ...state, currentPage: payload };
    }
    default:
      return { ...state, currentPage: 'banners' };
  }
}

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isMobile);
  const [isOpenSignOutDialog, setIsOpenSignOutDialog] =
    useState<boolean>(false);

  const { pathname } = useLocation();

  const pages: Record<SidebarCurrentPageType, SidebarCurrentPageUriType> = {
    about: '/admin/about',
    banners: '/admin/banners',
    highlights: '/admin/events',
    products: '/admin/categories',
  };

  const pagesUri: Record<SidebarCurrentPageUriType, SidebarCurrentPageType> = {
    '/admin/about': 'about',
    '/admin/banners': 'banners',
    '/admin/events': 'highlights',
    '/admin/categories': 'products',
  };

  const [page, dispatch] = useReducer(reducer, {
    currentPage: pagesUri[pathname as SidebarCurrentPageUriType],
  } as never);

  const { handleSignOut } = useAuth();

  function handleChangeCurrentPage(newPage: SidebarCurrentPageType): void {
    dispatch({ type: pages[newPage], payload: newPage });
  }

  function handleSignOutAccept(): void {
    setIsOpenSignOutDialog(false);
    handleSignOut();
  }

  const isBanners = page.currentPage === 'banners';
  const isHighlights = page.currentPage === 'highlights';
  const isAbout = page.currentPage === 'about';
  const isProducts = page.currentPage === 'products';

  const width = isCollapsed ? 'w-auto' : 'w-full sm:w-auto';
  const textsClassName = `${isCollapsed ? 'hidden' : 'flex'} text-wrap`;
  const menuJustify = isCollapsed ? 'justify-center' : 'justify-between';

  return (
    <>
      <aside className={`fixed sm:relative ${width} top-0 left-0 z-50`}>
        <FlowbiteSidebar
          aria-label='Menu lateral da Artelier Maisa'
          collapsed={isCollapsed}
        >
          <div
            className={`flex w-full h-auto ${menuJustify} items-center mb-7`}
          >
            <img
              src={PRIMARY_LOGO}
              alt='Logo da Artelier Maisa'
              className={isCollapsed ? 'hidden' : 'size-16'}
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

export default memo(Sidebar);
