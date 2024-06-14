import { Label, Textarea, TextInput } from 'flowbite-react';
import { ChangeEvent } from 'react';

import { InputProps, InputVariant } from '../../@types';
import { textInputTypes } from '../../constants';

export function Input(props: InputProps) {
  const {
    type = 'text',
    mode = 'normal',
    variant = 'input',
    isDisabled = false,
    isRequired = false,
    isHugWidth = false,
    value,
    label,
    placeholder,
    maxLength,
    onChange,
  } = props;

  const isPassword = type === 'password';
  const isWhatsApp = type === 'whatsapp';
  const maxWidth = isHugWidth ? 'max-w-[28rem]' : 'max-w-none';
  const textColor = mode === 'normal' ? 'primary' : 'primary60';

  const commonInputProps = {
    value,
    placeholder,
    id: 'input',
    color: textColor,
    required: isRequired,
    disabled: isDisabled,
    shadow: true,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange && onChange(event.target.value),
  };

  const inputVariants: Record<InputVariant, React.JSX.Element> = {
    input: (
      <TextInput
        type={textInputTypes[type]}
        minLength={isPassword ? 6 : undefined}
        maxLength={isWhatsApp ? 20 : maxLength}
        sizing='lg'
        {...commonInputProps}
      />
    ),
    textarea: <Textarea maxLength={maxLength} {...commonInputProps} />,
  };

  return (
    <div className={`flex flex-col w-full ${maxWidth} gap-1`}>
      {label && (
        <div className='block'>
          <Label htmlFor='input' value={label} color={textColor} />
        </div>
      )}

      {inputVariants[variant]}
    </div>
  );
}
