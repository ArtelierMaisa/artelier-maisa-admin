import { Sidebar as FlowbiteSidebar } from 'flowbite-react';
import { useState } from 'react';

import packageJson from '../../../package.json';
import { SidebarCurrentPageType } from '../../@types';
import { PRIMARY_LOGO } from '../../config';
import { Icon, Text } from '../';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [currentPage, setCurrentPage] =
    useState<SidebarCurrentPageType>('banners');

  function handleChangeCurrentPage(newPage: SidebarCurrentPageType): void {
    if (newPage !== currentPage) setCurrentPage(newPage);
  }

  const isBanners = currentPage === 'banners';
  const isHighlights = currentPage === 'highlights';
  const isAbout = currentPage === 'about';
  const isProducts = currentPage === 'products';

  const width = isCollapsed ? 'w-auto' : 'w-full sm:w-auto';

  return (
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
          <FlowbiteSidebar.Item
            href='#'
            icon={() => (
              <Icon
                variant='image'
                size='small'
                color={isBanners ? 'white' : 'background-color'}
                isCursorPointer
                onClick={() => handleChangeCurrentPage('banners')}
              />
            )}
          >
            <button
              type='button'
              className='outline-none cursor-pointer focus:outline-none'
              onClick={() => handleChangeCurrentPage('banners')}
            >
              <Text
                type='semibold'
                color={isBanners ? 'white' : 'background-color'}
                className='text-wrap'
              >
                Cadastro de Banners de Boas Vindas
              </Text>
            </button>
          </FlowbiteSidebar.Item>

          <FlowbiteSidebar.Item
            href='#'
            icon={() => (
              <Icon
                variant='shopping-cart'
                size='small'
                color={isProducts ? 'white' : 'background-color'}
                isCursorPointer
                onClick={() => handleChangeCurrentPage('products')}
              />
            )}
          >
            <button
              type='button'
              className='outline-none cursor-pointer focus:outline-none'
              onClick={() => handleChangeCurrentPage('products')}
            >
              <Text
                type='semibold'
                color={isProducts ? 'white' : 'background-color'}
                className='text-wrap'
              >
                Cadastro de Produtos
              </Text>
            </button>
          </FlowbiteSidebar.Item>

          <FlowbiteSidebar.Item
            href='#'
            icon={() => (
              <Icon
                variant='palette'
                size='small'
                color={isHighlights ? 'white' : 'background-color'}
                isCursorPointer
                onClick={() => handleChangeCurrentPage('highlights')}
              />
            )}
          >
            <button
              type='button'
              className='outline-none cursor-pointer focus:outline-none'
              onClick={() => handleChangeCurrentPage('highlights')}
            >
              <Text
                type='semibold'
                color={isHighlights ? 'white' : 'background-color'}
                className='text-wrap'
              >
                Cadastro de Divulgações
              </Text>
            </button>
          </FlowbiteSidebar.Item>

          <FlowbiteSidebar.Item
            href='#'
            icon={() => (
              <Icon
                variant='address-book-tabs'
                size='small'
                color={isAbout ? 'white' : 'background-color'}
                isCursorPointer
                onClick={() => handleChangeCurrentPage('about')}
              />
            )}
          >
            <button
              type='button'
              className='outline-none cursor-pointer focus:outline-none'
              onClick={() => handleChangeCurrentPage('about')}
            >
              <Text
                type='semibold'
                color={isAbout ? 'white' : 'background-color'}
                className='text-wrap'
              >
                Sobre a Maisa
              </Text>
            </button>
          </FlowbiteSidebar.Item>

          <FlowbiteSidebar.Item
            href='#'
            icon={() => (
              <Icon variant='sign-out' size='small' color='background-color' />
            )}
          >
            <Text
              type='semibold'
              color='background-color'
              className='text-wrap'
            >
              Sair
            </Text>
          </FlowbiteSidebar.Item>
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
  );
}
