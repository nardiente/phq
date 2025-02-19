export const components = {
  // Input Fields
  input: {
    base: 'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors',
    focus: 'focus:border-primary-300 focus:ring-2 focus:ring-primary-50',
    disabled: 'opacity-50 cursor-not-allowed bg-gray-50',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-50',
    sizes: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg'
    }
  },

  // Checkboxes
  checkbox: {
    base: 'h-4 w-4 rounded border-gray-300 text-primary-400 transition-colors',
    focus: 'focus:ring-2 focus:ring-primary-50 focus:ring-offset-2',
    disabled: 'opacity-50 cursor-not-allowed',
    label: 'ml-2 text-sm text-gray-700'
  },

  // Dropdowns
  select: {
    base: 'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none appearance-none',
    focus: 'focus:border-primary-300 focus:ring-2 focus:ring-primary-50',
    icon: 'absolute right-3 top-1/2 -translate-y-1/2 text-gray-400',
    options: {
      base: 'mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 text-base shadow-lg',
      option: 'cursor-pointer px-3 py-2 text-sm text-gray-900 hover:bg-gray-50'
    }
  },

  // Date Picker
  datePicker: {
    base: 'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900',
    focus: 'focus:border-primary-300 focus:ring-2 focus:ring-primary-50',
    calendar: {
      base: 'mt-1 rounded-lg border border-gray-200 bg-white p-2 shadow-lg',
      header: 'mb-2 flex items-center justify-between px-2',
      weekday: 'mb-1 text-xs font-medium text-gray-500',
      day: 'h-8 w-8 rounded-full text-sm leading-8 text-center',
      selected: 'bg-primary-400 text-white',
      today: 'bg-primary-50 text-primary-400',
      disabled: 'text-gray-300 cursor-not-allowed'
    }
  },

  // Links
  link: {
    base: 'text-primary-400 hover:text-primary-500 transition-colors',
    sizes: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    },
    variants: {
      default: 'hover:underline',
      subtle: 'text-gray-600 hover:text-gray-900',
      button: 'inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium'
    }
  },

  // Buttons (expanded)
  button: {
    base: 'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2',
    variants: {
      primary: {
        base: 'bg-primary-400 text-white border-none',
        hover: 'hover:bg-primary-500',
        focus: 'focus:ring-primary-50'
      },
      secondary: {
        base: 'bg-white text-gray-700 border border-gray-200',
        hover: 'hover:bg-gray-50',
        focus: 'focus:ring-gray-50'
      }
    },
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }
  },

  card: {
    base: 'bg-white rounded-lg shadow-sm border border-gray-200',
    padding: {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6'
    }
  }
} 