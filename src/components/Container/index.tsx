import { memo } from 'react';

import { ContainerProps } from '../../@types';

function Container(props: ContainerProps) {
  const { children } = props;

  return (
    <main className='flex flex-col w-full h-screen ml-[3.25rem] sm:ml-0 p-2 sm:p-5 overflow-y-auto'>
      {children}
    </main>
  );
}

export default memo(Container);
