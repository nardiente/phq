import { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      // COLOR PALETTE
      colors: {
        'active-link': '#913187',
        primary: '#5a00cd',
        secondary: '#ebdff9',
        hover: '#44009a',
        disabled: '#d6bff3',
        neutral: {
          DEFAULT: '#475466',
          light: '#F9FAFB',
          border: '#E5E7EB',
          text: '#09031A',
        },
        button: {
          dark: '#09041a',
          gray: '#888399',
          green: '#10B981',
          blue: '#3B82F6',
          purple: '#5a00cd',
          red: '#EF4444',
          orange: '#FF6334',
          yellow: '#EAB308',
          'purple-hover': '#44009A',
          'purple-soft': '#EBDFF9',
        },
        badge: {
          white: '#FFFFFF',
          outlined: '#AC80E6',
          soft: '#EBDEF9',
          solid: '#5A00CD',
          text: {
            white: '#09041A',
            outlined: '#5A00CD',
            soft: '#5A00CD',
            solid: '#FFFFFF',
          },
        },
        // Accordion-specific colors
        custom: {
          purple: {
            DEFAULT: '#44009A',
            dark: '#5A00CD',
          },
          text: {
            DEFAULT: '#110733',
            muted: '#4D4566',
          },
        },
        'outlined-badge': {
          DEFAULT: '#9CA3AF',
          100: '#E5E7EB',
          200: '#A7F4D0',
          300: '#BFD9FF',
          400: '#AC80E6',
          500: '#FDCACA',
          600: '#FFB19A',
          700: '#FEEA8A',
          800: '#FFFFFF',
          text1: '#110047',
          text2: '#4D4566',
          text3: '#10B081',
          text4: '#3B82F6',
          text5: '#5A00CD',
          text6: '#EF4444',
          text7: '#BF4A27',
          text8: '#EAAD08',
        },
        alert: {
          // Base colors
          dark: '#110733',
          green: '#10B981',
          purple: '#5A00CD',
          blue: '#3B82F6',
          red: '#EF4444',
          orange: '#FF6334',
          yellow: '#FACC15',
          light: '#FFFFFF',
          gray: '#4D4566',

          // Soft variant backgrounds
          'soft-dark': '#F9FAFB',
          'soft-gray': '#F9FAFB',
          'soft-green': '#F0FDF4',
          'soft-purple': '#EBDFF9',
          'soft-blue': '#EFF6FF',
          'soft-red': '#FEF2F2',
          'soft-orange': '#FFF5F2',
          'soft-yellow': '#FEFCE8',

          // Text colors for soft variants
          'soft-dark-text': '#110733',
          'soft-gray-text': '#4D4566',
          'soft-green-text': '#047857',
          'soft-purple-text': '#5A00CD',
          'soft-blue-text': '#1D4ED8',
          'soft-red-text': '#B91C1C',
          'soft-orange-text': '#BF4A27',
          'soft-yellow-text': '#854D0E',
        },
        accordion: {
          border: '#E5E7EB',
          text: '#09041A',
          hover: '#F9FAFB',
          title: {
            color: '#000000',
          },
        },
        accordionTitle: '#000000',
        'custom-gray': '#6B7280',
        'custom-orange': '#F97316',
        'custom-purple': '#8B5CF6',
        'custom-blue': '#3B82F6',
        'interdimensional-blue': {
          10: '#F9F5FD',
          50: '#EBDFF9',
          100: '#D6BFF3',
          200: '#AC80E6',
          300: '#8340D9',
          400: '#5A00CD',
          500: '#44009A',
          600: '#2D0067',
          700: '#170033',
        },
        'portland-orange': {
          100: '#FFD8CC',
          200: '#FFB199',
          300: '#FF8A67',
          400: '#FF6334',
          500: '#BF4A27',
          600: '#80321A',
          700: '#40190D',
        },
        topaz: {
          100: '#FFF0DA',
          200: '#FEE1B5',
          300: '#FDD390',
          400: '#FDC46B',
          500: '#BE9350',
          600: '#7F6236',
          700: '#3F311B',
        },
        'cetacean-blue': {
          100: '#C3C1CC',
          200: '#888399',
          300: '#4D4566',
          400: '#110733',
          500: '#09041A',
        },
        'ghost-white': {
          400: '#F9F9FA',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        zinc: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        'button-dark': '#09041a',
        'button-gray': '#888399',
        'button-purple': '#5a00cd',
        'button-orange': '#ff6334',
        'gray-100': '#e5e7eb',
        'gray-50': '#f3f4f6',
        'emerald-100': '#a7f3d0',
        'blue-50': '#dbeafe',
        'red-100': '#fecaca',
        'yellow-100': '#fef3c7',
        'white/10': 'rgba(255, 255, 255, 0.2)',
        ebdff9: '#c4a4e0',
        ffd8cc: '#ff9f7f',
      },

      // TYPOGRAPHY
      fontFamily: {
        sans: ['Satoshi-Medium', 'sans-serif'],
        serif: ['YourSerifFont', 'serif'],
        mono: ['YourMonoFont', 'monospace'],
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '15': '15px', // Accordion-specific
        'badge-sm': '10px',
        'badge-base': '12px',
        'alert-title': [
          '18px',
          {
            lineHeight: '22px',
            letterSpacing: '0.005em',
          },
        ],
        'alert-body': [
          '16px',
          {
            lineHeight: '24px',
            letterSpacing: '0.005em',
          },
        ],
        'button-sm': '0.875rem', // 14px
        'button-md': '1rem', // 16px
        'button-lg': '1.125rem', // 18px
        'badge-md': ['14px', { lineHeight: '20px' }],
        'badge-lg': ['16px', { lineHeight: '24px' }],
        'accordion-title': ['16px', { lineHeight: '24px' }],
        'accordion-content': ['14px', { lineHeight: '20px' }],
        h1: '28px',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
      },

      // SPACING
      spacing: {
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '14': '14px', // Accordion-specific
        '15': '15px', // Accordion-specific
        '14px': '14px', // For py-[14px]
        'alert-p': '16px', // p-4
        'alert-px': '20px', // px-5
        'alert-py': '14px', // py-[14px]
        'button-sm': '8px',
        'button-md': '12px',
        'button-lg': '16px',
        'badge-sm': '4px',
        'badge-md': '6px',
        'badge-lg': '8px',
        'accordion-p': '16px',
      },

      // BORDER RADIUS
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '12px', // Accordion-specific
        full: '9999px',
        alert: '6px', // rounded-md
        'alert-full': '9999px', // rounded-full
        button: '6px',
        badge: '9999px',
        accordion: '12px',
        'button-md': '0.375rem', // rounded-md
        'button-full': '9999px', // rounded-full
      },

      // SHADOWS
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        button: '0px 1px 2px rgba(0, 0, 0, 0.05)',
        'button-hover': '0px 2px 4px rgba(0, 0, 0, 0.1)',
        badge: '0px 1px 2px rgba(0, 0, 0, 0.05)',
        accordion: '0px 1px 3px rgba(0, 0, 0, 0.1)',
      },

      // LETTER SPACING
      letterSpacing: {
        wider: '0.005em', // Accordion-specific
        button: '0.005em', // For tracking-[0.005em]
      },

      // BUTTON STYLES
      button: {
        width: '86px',
        height: '48px',
        paddingX: '5',
        paddingY: '3.5',
        borderRadius: 'md',
        border: 'DEFAULT',
        borderColor: '#09031A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textColor: '#09031A',
        fontSize: '15px',
        fontWeight: 'medium',
      },

      // Add badge sizes configuration
      badgeSizes: {
        sm: {
          paddingX: '4px',
          paddingY: '2px',
        },
        DEFAULT: {
          paddingX: '6px',
          paddingY: '4px',
        },
        lg: {
          paddingX: '10px',
          paddingY: '8px',
        },
      },

      gap: {
        '30': '30px', // For gap-[30px]
        alert: '20px', // gap-5
        'alert-sm': '10px', // gap-2.5
        button: '8px',
        badge: '4px',
        accordion: '16px',
      },

      lineHeight: {
        '18': '18px', // For leading-[18px]
        '22': '22px', // For leading-[22px]
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

      keyframes: {
        'accordion-down': {
          '0%': { height: '0' },
          '100%': { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          '0%': { height: 'var(--radix-accordion-content-height)' },
          '100%': { height: '0' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

export default config;
