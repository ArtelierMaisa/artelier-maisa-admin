import { SearchInputProps } from '../../@types';
import { GenericButton, Icon } from '../';

export function SearchInput(props: SearchInputProps) {
  const { searchValue, onChange, onSearch } = props;

  return (
    <>
      <form className='w-full max-w-[38rem] rounded-lg sm:rounded-s-lg shadow-default mb-2 sm:mb-0'>
        <div className='flex relative'>
          <div className='relative w-full'>
            <input
              value={searchValue}
              type='search'
              className='block w-full h-16 z-20 p-4 sm:p-2 sm:pr-16 rounded-lg sm:rounded-s-lg bg-background-color text-primary font-normal text-base placeholder-primary60 border-transparent focus:ring focus:ring-primary60 focus:border-primary60'
              placeholder='Buscar categoria'
              onChange={onChange}
              required
            />

            <button
              type='button'
              className='absolute top-0 end-0 hidden sm:flex w-16 h-16 justify-center items-center p-2 bg-primary rounded-e-lg hover:transition-opacity hover:duration-300 hover:opacity-90 focus:outline-none focus:ring focus:ring-primary60 focus:border-primary60'
              onClick={onSearch}
            >
              <Icon variant='magnifying-glass' color='background-color' />

              <span className='sr-only'>Search</span>
            </button>
          </div>
        </div>
      </form>

      <div className='relative flex flex-col sm:hidden w-full gap-2'>
        <GenericButton
          title='Buscar produto ou categoria'
          onClick={onSearch}
          isHugWidth
        />
      </div>
    </>
  );
}
