import {
  AddressBookTabs,
  CaretLeft,
  CaretRight,
  Eye,
  EyeSlash,
  Image,
  Info,
  List,
  MagnifyingGlass,
  Package,
  Palette,
  Pencil,
  Plus,
  ShoppingCart,
  SignOut,
  Trash,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react';
import { memo } from 'react';

import { IconProps } from '../../@types';
import { iconColors, iconSizes } from '../../constants';

function Icon(props: IconProps) {
  const {
    variant,
    color = 'background-color',
    size = 'x-small',
    isCursorPointer = false,
    onClick,
  } = props;

  const iconCommonProps = {
    color: iconColors[color],
    size: iconSizes[size],
    className: isCursorPointer ? 'cursor-pointer' : '',
    onClick,
  };

  const icons: Record<IconProps['variant'], React.JSX.Element> = {
    'caret-left': <CaretLeft {...iconCommonProps} />,
    'caret-right': <CaretRight {...iconCommonProps} />,
    'magnifying-glass': <MagnifyingGlass {...iconCommonProps} />,
    'address-book-tabs': <AddressBookTabs {...iconCommonProps} />,
    'eye-slash': <EyeSlash {...iconCommonProps} />,
    'shopping-cart': <ShoppingCart {...iconCommonProps} />,
    'sign-out': <SignOut {...iconCommonProps} />,
    'whatsapp-logo': <WhatsappLogo {...iconCommonProps} />,
    x: <X {...iconCommonProps} />,
    eye: <Eye {...iconCommonProps} />,
    image: <Image {...iconCommonProps} />,
    info: <Info {...iconCommonProps} />,
    list: <List {...iconCommonProps} />,
    palette: <Palette {...iconCommonProps} />,
    pencil: <Pencil {...iconCommonProps} />,
    plus: <Plus {...iconCommonProps} />,
    trash: <Trash {...iconCommonProps} />,
    package: <Package {...iconCommonProps} />,
  };

  return icons[variant];
}

export default memo(Icon);
