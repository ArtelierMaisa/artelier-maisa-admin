import { DialogProps, TextProps } from '../../@types';
import { dialogTitles } from '../../constants';
import { GenericButton, Icon, Modal, Text } from '../';

export function Dialog(props: DialogProps) {
  const { isOpen, variant, data, onAccept, onClose } = props;

  const commonTextProps: Omit<TextProps, 'children'> = {
    display: 'inline',
    color: 'primary',
    toCenter: true,
  };

  const commonSpanClassNames =
    'font-semibold text-base text-center text-primary';

  function generateDialogMessages(): Record<
    DialogProps['variant'],
    React.JSX.Element
  > {
    return {
      banner: (
        <Text {...commonTextProps}>
          Tem certeza que deseja{' '}
          <span className={commonSpanClassNames}>excluir</span> este banner?
        </Text>
      ),
      category: (
        <div className='flex flex-col gap-4'>
          <Text {...commonTextProps}>
            Tem certeza que deseja{' '}
            <span className={commonSpanClassNames}>excluir</span> à categoria{' '}
            <span className={commonSpanClassNames}>{data?.name || ''}</span>?
          </Text>

          <div className='flex flex-row items-center gap-2'>
            <Icon variant='info' color='primary' size='medium' />

            <Text type='medium' color='primary'>
              Ao excluir a categoria, todos os produtos cadastrados nela também
              serão excluídos!
            </Text>
          </div>
        </div>
      ),
      product: (
        <Text {...commonTextProps}>
          Tem certeza que deseja{' '}
          <span className={commonSpanClassNames}>excluir</span> o produto{' '}
          <span className={commonSpanClassNames}>{data?.name || ''}</span>?
        </Text>
      ),
      event: (
        <Text {...commonTextProps}>
          Tem certeza que deseja{' '}
          <span className={commonSpanClassNames}>excluir</span> esta divulgação?
        </Text>
      ),
      'sign-out': (
        <Text {...commonTextProps}>
          Ao sair da plataforma você terá que realizar o login novamente.
        </Text>
      ),
    };
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose || onAccept}>
      <div className='relative flex flex-col w-11/12 md:w-[32rem] lg:h-auto overflow-hidden p-6 gap-4 rounded-2xl bg-white shadow-default'>
        <button
          type='button'
          className='absolute flex top-0 right-0 justify-center items-center w-8 h-8 bg-primary rounded-tr-lg cursor-pointer hover:opacity-90 transition-colors duration-300'
          onClick={onClose}
        >
          <Icon variant='x' color='white' />
        </button>

        <Text type='semibold' color='primary' toCenter>
          {dialogTitles[variant]}
        </Text>

        {generateDialogMessages()[variant]}

        <div className='flex flex-row w-full mt-2 gap-2 justify-center items-center'>
          <GenericButton
            variant='primary'
            type='medium'
            title='Sim'
            isHugWidth
            onClick={onAccept}
          />

          <GenericButton
            variant='secondary'
            type='medium'
            title='Não'
            isHugWidth
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
}
