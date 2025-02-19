/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      // COLOR PALETTE
      colors: {
        primary: {
          DEFAULT: '#5A00CD',
          light: '#EBDFFA',
          hover: '#44009A',
          disabled: '#D6BFF3',
        },
        neutral: {
          DEFAULT: '#475466',
          light: '#F9FAFB',
          border: '#E5E7EB',
          text: '#09031A',
        },
        button: {
          dark: '#090319',
          gray: '#888399',
          green: '#10B981',
          blue: '#3B82F6',
          purple: '#5A00CD',
          red: '#EF4444',
          orange: '#FF6334',
          yellow: '#EAB308',
        },
        // Add badge colors
        badge: {
          white: '#FFFFFF',
          outlined: '#AC80E6',
          soft: '#EBDEF9',
          solid: '#5A00CD',
        },
        // Add outlined badge colors
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
        // Add soft badge colors
        'soft-badge': {
          DEFAULT: '#F3F4F6',
          100: '#F9FAFB',
          200: '#D1F9E5',
          300: '#DBEBFF',
          400: '#EBDEF9',
          500: '#FDE2E2',
          600: '#FFD8CC',
          700: '#FFF8C3',
          800: 'rgba(255, 255, 255, 0.5)',
          text1: '#110748',
          text2: '#4D4566',
          text3: '#10B081',
          text4: '#3B82F6',
          text5: '#5A00CD',
          text6: '#EF4444',
          text7: '#BF4A27',
          text8: '#CA8A04',
          text9: '#FFFFFF',
        },
        // Add solid badge colors
        'solid-badge': {
          DEFAULT: '#110447',
          100: '#4D4566',
          200: '#10B181',
          300: '#3A82F6',
          400: '#5A00CD',
          500: '#EF4444',
          600: '#F97316',
          700: '#FACC15',
          800: '#FFFFFF',
          text8: '#110447',
        },
        gray: {
          600: '#475466',
          800: '#1F2937',
          300: '#D1D5DB',
          200: '#E5E7EB',
          700: '#4B5563',
          100: '#F3F4F6',
          900: '#111827',
          400: '#9CA3AF',
        },
        green: {
          100: '#ECFDF5',
          600: '#047857',
          700: '#065F46',
        },
        blue: {
          500: '#3B82F6',
        },
        purple: {
          100: '#EDE9FE',
          700: '#5B21B6',
          200: '#DDD6FE',
        },
        '090827': '#090827',
        'E5E7EB': '#E5E7EB',
        '09021A': '#09021A',
        'indigo-900': '#312E81',
        'purple-900': '#4C1D95',
        accordion: {
          'title-color': '#09031A',
        },
      },

      // TYPOGRAPHY
      fontFamily: {
        sans: ['Satoshi-Medium', 'sans-serif'],
      },
      fontSize: {
        sm: '0.8rem',
        xs: '0.75rem',
        base: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '2rem',
        'badge-sm': '10px',
        'badge-base': '12px',
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
      },

      // BORDER RADIUS
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        full: '9999px',
      },

      // SHADOWS
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
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

      // Extend width and height
      extend: {
        width: {
          '1.5': '0.375rem',
          '3.5': '0.875rem',
          '4': '1rem',
          '3': '0.75rem',
          '64': '16rem',
          '20': '5rem',
        },
        height: {
          '1.5': '0.375rem',
          '3.5': '0.875rem',
          '4': '1rem',
          '3': '0.75rem',
          '12': '3rem',
        },
      },
    },
  },
  plugins: [],
} 