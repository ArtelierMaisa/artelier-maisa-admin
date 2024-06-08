import { CustomFlowbiteTheme } from 'flowbite-react';

export const flowtibeTheme: CustomFlowbiteTheme = {
  textInput: {
    base: 'flex h-16',
    addon: 'inline-flex items-center text-base text-primary rounded-lg',
    field: {
      input: {
        colors: {
          primary:
            'bg-white border-primary text-primary placeholder-primary60 focus:border-primary focus:ring-primary',
          primary60:
            'bg-background-color border-primary text-primary placeholder-primary60 focus:border-primary focus:ring-primary',
        },
        sizes: {
          lg: 'px-3 py-4 text-base',
        },
        withShadow: {
          off: 'shadow-default',
          on: 'shadow-default',
        },
      },
    },
  },

  textarea: {
    base: 'block w-full min-h-48 rounded-lg text-base disabled:cursor-not-allowed disabled:opacity-50',
    colors: {
      primary:
        'bg-white border-primary text-primary placeholder-primary60 focus:border-primary focus:ring-primary',
      primary60:
        'bg-background-color border-primary text-primary placeholder-primary60 focus:border-primary focus:ring-primary',
    },
    withShadow: {
      off: 'shadow-default',
      on: 'shadow-default',
    },
  },

  label: {
    root: {
      base: 'text-base font-medium',
      colors: {
        primary: 'text-primary',
        primary60: 'text-primary',
      },
    },
  },
};
