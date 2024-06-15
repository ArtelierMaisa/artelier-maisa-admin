import { Label, Textarea, TextInput } from 'flowbite-react';
import { ChangeEvent } from 'react';
import { NumericFormat, PatternFormat } from 'react-number-format';

import { InputProps, InputVariant } from '../../@types';
import { textInputTypes } from '../../constants';
import { Icon } from '../Icon';

export function Input(props: InputProps) {
  const {
    id = 'input',
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
  const maxWidth = isHugWidth ? 'max-w-none' : 'max-w-[28rem]';
  const textColor = mode === 'normal' ? 'primary' : 'primary60';

  const commonInputProps = {
    id,
    value,
    placeholder,
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
        maxLength={maxLength}
        sizing='lg'
        {...commonInputProps}
      />
    ),
    'input-currency': (
      <NumericFormat
        customInput={TextInput}
        thousandsGroupStyle='thousand'
        thousandSeparator='.'
        prefix='R$ '
        decimalSeparator=','
        decimalScale={2}
        allowLeadingZeros
        allowNegative={false}
        maxLength={16}
        minLength={0}
        max={99999}
        min={0}
        {...commonInputProps}
      />
    ),
    'input-whatsapp': (
      <PatternFormat
        type='tel'
        customInput={TextInput}
        format='+55 (##) # ####-####'
        mask='_'
        allowEmptyFormatting
        {...commonInputProps}
      />
    ),
    textarea: <Textarea maxLength={maxLength} {...commonInputProps} />,
  };

  return (
    <div className={`flex flex-col w-full ${maxWidth} gap-1`}>
      {label && (
        <div className='flex flex-row gap-1 items-center'>
          {type === 'whatsapp' && (
            <Icon variant='whatsapp-logo' color='primary' />
          )}

          <Label htmlFor='input' value={label} color={textColor} />
        </div>
      )}

      {inputVariants[variant]}
    </div>
  );
}
