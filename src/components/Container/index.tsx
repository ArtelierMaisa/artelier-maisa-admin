import { ContainerProps } from '../../@types';

export function Container(props: ContainerProps) {
  const { children, className } = props;

  return (
    <main
      className={`flex flex-col w-full h-full ml-[3.25rem] sm:ml-0 p-1 sm:p-5 ${className}`}
    >
      {children}
    </main>
  );
}
