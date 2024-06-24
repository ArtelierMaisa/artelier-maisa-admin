import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { ExternalToast, toast } from 'sonner';

import { About as AboutData } from '../../@types';
import {
  Container,
  DotButton,
  GenericButton,
  Icon,
  Input,
  Sidebar,
  Spinner,
  Text,
} from '../../components';
import { ACCEPT_EXTENSION_FILES } from '../../config';
import { useUser } from '../../hooks';

export function About() {
  const { isLoaded, about: aboutFirebase, handlePutAbout } = useUser();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>('');
  const [about, setAbout] = useState<AboutData>({} as AboutData);
  const [file, setFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const toastOptions: ExternalToast = { duration: 7500 };

  function handleOpenExplorer(): void {
    if (inputRef.current) inputRef.current.click();
  }

  function handleGetFile(event: ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files;

    if (files) {
      const firstFile = files[0];
      const fileType = files[0].type;
      const isAcceptFile = ACCEPT_EXTENSION_FILES.includes(fileType);

      if (!isAcceptFile) {
        toast.error(
          'Formato da imagem selecionada é inválido! Os formatos aceitos são: PNG, JPG ou JPEG.',
          toastOptions,
        );
        return;
      }

      const blob = new Blob([firstFile], { type: fileType });
      const reader = new FileReader();
      reader.onload = e => setProfileImage((e.target?.result as string) || '');
      reader.readAsDataURL(blob);

      setFile(firstFile);
    } else {
      toast.error('Não foi possível capturar a imagem. Tente novamente.');
    }
  }

  async function handleSubmitAbout(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!about?.uri) {
      toast.error(
        'Cadastro Incompleto! Você precisa enviar uma foto de perfil para finalizar o processo.',
        toastOptions,
      );
      return;
    }

    setIsLoading(true);
    await handlePutAbout({ ...about, file: file! });
    setAbout({ ...about, uri: profileImage });
    setIsLoading(false);

    toast.success('Sua edição de perfil foi realizada com sucesso!', {
      duration: 3000,
    });
  }

  useEffect(() => {
    if (aboutFirebase?.id) {
      setProfileImage(aboutFirebase.uri);
      setAbout(aboutFirebase);
    }
  }, [aboutFirebase]);

  return (
    <div className='flex w-full h-screen'>
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

        {isLoaded ? (
          <form
            onSubmit={async event => await handleSubmitAbout(event)}
            className='flex flex-col mx-auto lg:min-w-[40rem]'
          >
            <div className='flex flex-col lg:flex-row justify-center items-center lg:items-start gap-4'>
              <div className='flex flex-col justify-center items-center gap-2'>
                <Text type='medium' color='primary' toCenter>
                  Foto de Perfil
                </Text>

                <button
                  type='button'
                  className='flex size-44 justify-center items-center rounded-lg overflow-hidden ring-2 ring-primary cursor-pointer hover:opacity-90 transition-colors duration-300 focus:outline-none focus:ring focus:ring-primary60 focus:border-primary60'
                  disabled={isLoading}
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

                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={`Foto de ${about.name}`}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <DotButton variant='medium' type='add' mode='figure' />
                  )}
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
                isDisabled={isLoading}
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
                  isCursorPointer={!isLoading}
                  onClick={handleOpenExplorer}
                />{' '}
                para adicionar a foto de perfil.
              </Text>

              <Text className='flex flex-row gap-1'>
                <Icon variant='info' color='primary' /> Para trocar de foto,
                basta clicar na foto de perfil.
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
                isDisabled={isLoading}
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
                  isDisabled={isLoading}
                  onChange={additional => setAbout({ ...about, additional })}
                />

                <GenericButton
                  title='Salvar'
                  variant='primary'
                  type='medium'
                  mode='submit'
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  isHugWidth
                />
              </div>
            </div>
          </form>
        ) : (
          <div className='flex flex-col w-full h-full gap-2 justify-center items-center'>
            <Text color='primary' type='medium' toCenter>
              Estamos carregando suas informações...
            </Text>

            <Spinner />
          </div>
        )}
      </Container>
    </div>
  );
}
