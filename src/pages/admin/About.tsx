import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { toast } from 'sonner';

import { About as AboutData } from '../../@types';
import {
  Container,
  DotButton,
  GenericButton,
  Icon,
  Input,
  Sidebar,
  Text,
} from '../../components';
import { ACCEPT_EXTENSION_FILES } from '../../config';

export function About() {
  const [about, setAbout] = useState<AboutData>({} as AboutData);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleOpenExplorer(): void {
    if (inputRef.current) inputRef.current.click();
  }

  function handleGetFile(event: ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files;

    if (files) {
      const file = files[0];
      const isAcceptFile = ACCEPT_EXTENSION_FILES.includes(file.type);

      if (!isAcceptFile) {
        toast.error(
          'Formato da imagem selecionada é inválido! Os formatos aceitos são: PNG, JPG ou JPEG.',
          { duration: 7500 },
        );
        return;
      }

      // TODO: You must specify the file to uri
      // setAbout({...about, uri: file})
    } else {
      toast.error('Não foi possível capturar a imagem. Tente novamente.');
    }
  }

  function handleSubmitAbout(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!about?.uri) {
      toast.error(
        'Cadastro Incompleto! Você precisa enviar uma foto de perfil para finalizar o processo.',
        { duration: 7500 },
      );
      return;
    }
  }

  return (
    <>
      <Sidebar />

      <Container>
        <header className='flex flex-col w-full justify-center items-center mb-6 gap-2'>
          <Text type='medium' toCenter>
            Sobre a Maisa
          </Text>

          <Text size='sm' toCenter>
            Nesta página é exclusiva para comentar sobre você mesma. Sinta-se à
            vontade aqui para comentar sobre a sua história na arte. Seus
            usuários poderão ver essas informações.
          </Text>
        </header>

        <form
          onSubmit={handleSubmitAbout}
          className='flex flex-col mx-auto lg:min-w-[40rem]'
        >
          <div className='flex flex-col lg:flex-row justify-center items-center lg:items-start gap-4'>
            <div className='flex flex-col justify-center items-center gap-2'>
              <Text type='medium' color='primary' toCenter>
                Foto de Perfil
              </Text>

              <button
                type='button'
                className='flex size-44 justify-center items-center rounded-lg ring-2 ring-primary cursor-pointer hover:opacity-90 transition-colors duration-300'
                onClick={handleOpenExplorer}
              >
                <input
                  type='file'
                  ref={inputRef}
                  accept='image/png, image/jpg, image/jpeg'
                  className='hidden'
                  multiple={false}
                  readOnly
                  onChange={handleGetFile}
                />

                <DotButton variant='medium' type='add' mode='figure' />
              </button>
            </div>

            <Input
              value={about.description || ''}
              id='input-about'
              variant='textarea'
              mode='nude'
              label='Sobre mim'
              placeholder='Uma bibliografia do seu trabalho...'
              maxLength={2096}
              isRequired
              onChange={description => setAbout({ ...about, description })}
            />
          </div>

          <div className='hidden md:flex flex-col my-4 gap-1'>
            <Text className='flex flex-row gap-1'>
              <Icon variant='info' color='primary' /> Clique em{' '}
              <Icon
                variant='plus'
                color='primary'
                isCursorPointer
                onClick={handleOpenExplorer}
              />{' '}
              para adicionar a foto de perfil.
            </Text>

            <Text className='flex flex-row gap-1'>
              <Icon variant='info' color='primary' /> Para trocar de foto, basta
              clicar na foto de perfil.
            </Text>
          </div>

          <div className='flex flex-col gap-4'>
            <Input
              value={about.name || ''}
              id='input-name'
              variant='input'
              type='text'
              mode='nude'
              label='Nome'
              placeholder='Nome completo'
              maxLength={256}
              isRequired
              onChange={name => setAbout({ ...about, name })}
            />

            <div className='flex flex-col lg:flex-row gap-4 justify-center items-end'>
              <Input
                value={about.additional || ''}
                id='input-additional'
                variant='textarea'
                mode='nude'
                label='Informações Adicionais'
                placeholder='Fale mais sobre você...'
                maxLength={512}
                isRequired
                onChange={additional => setAbout({ ...about, additional })}
              />

              <GenericButton
                title='Salvar'
                variant='primary'
                type='medium'
                mode='submit'
                isHugWidth
              />
            </div>
          </div>
        </form>
      </Container>
    </>
  );
}
