import { DotButtonType, ImageCardProps } from '../../@types';

export const imageCardTitles: Record<Required<ImageCardProps>['type'], string> =
  {
    edit: 'Imagem adicionada! Clique para editar',
    photo: 'Escolha uma imagem de divulgação',
  };

export const imageCardTypes: Record<
  Required<ImageCardProps>['type'],
  DotButtonType
> = {
  edit: 'pencil',
  photo: 'add',
};
