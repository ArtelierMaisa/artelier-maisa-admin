import { CustomFlowbiteTheme } from 'flowbite-react';

export const flowtibeTheme: CustomFlowbiteTheme = {
  textInput: {
    base: 'flex h-16',
    addon: 'inline-flex items-center text-base text-primary rounded-lg',
    field: {
      input: {
        colors: {
          primary:
            'h-full bg-white border-primary text-primary placeholder-primary60 focus:border-primary focus:ring-primary',
          primary60:
            'h-full bg-background-color border-primary text-primary placeholder-primary60 focus:border-primary focus:ring-primary',
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
    base: 'block w-full h-48 max-h-48 min-h-48 resize-none rounded-lg text-base disabled:cursor-not-allowed disabled:opacity-50 scrollbar scrollbar-w-3 scrollbar-thumb-rounded-lg scrollbar-thumb-primary scrollbar-track-white-color overflow-y-scroll',
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

  spinner: {
    base: 'inline animate-spin text-transparent',
    color: {
      white: 'fill-white',
      white60: 'fill-white60',
      primary: 'fill-primary',
      primary60: 'fill-primary60',
    },
  },

  sidebar: {
    root: {
      base: 'h-screen sm:h-full',
      collapsed: {
        on: 'flex w-auto',
        off: 'w-full sm:w-72',
      },
      inner:
        'flex flex-col h-full overflow-y-auto overflow-x-hidden p-3 bg-primary',
    },
    itemGroup: {
      base: 'flex flex-col gap-5 mb-7',
    },
    item: {
      base: 'flex items-center justify-center gap-3',
      active: '',
      collapsed: {
        noIcon: '',
      },
      content: {
        base: 'flex-1 whitespace-nowrap bg-primary',
      },
      icon: {
        base: 'size-7 flex-shrink-0',
        active: '',
      },
    },
  },

  carousel: {
    root: {
      leftControl:
        'absolute left-0 top-0 flex h-full items-center justify-center px-3',
      rightControl:
        'absolute right-0 top-0 flex h-full items-center justify-center px-3',
    },
    scrollContainer: {
      base: 'flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-t-lg',
    },
  },
};
