import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Direct CSS variables integration
        'deep-indigo': 'var(--deep-indigo)',
        'medium-blue': 'var(--medium-blue)',
        'sky-blue': 'var(--sky-blue)',
        'soft-blue': 'var(--soft-blue)',
        'pale-blue': 'var(--pale-blue)',
        'off-white': 'var(--off-white)',
        'light-bg': 'var(--light-bg)',
        'success': 'var(--success)',
        'warning': 'var(--warning)',
        'error': 'var(--error)',
        'info': 'var(--info)',
      },
      
      fontFamily: {
        'display': 'var(--font-display)',
        'body': 'var(--font-body)',
        'sans': 'var(--font-body)',
      },
      
      fontSize: {
        'hero': 'var(--text-6xl)',
        'display': 'var(--text-4xl)',
      },

      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-primary-hover': 'var(--gradient-primary-hover)',
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-card': 'var(--gradient-card)',
        'gradient-accent': 'var(--gradient-accent)',
      },

      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'button': 'var(--shadow-button)',
        'button-hover': 'var(--shadow-button-hover)',
      },

      borderRadius: {
        'ellio': 'var(--radius-lg)',
        'ellio-lg': 'var(--radius-xl)',
        'ellio-xl': 'var(--radius-2xl)',
      },

      spacing: {
        'nav': 'var(--nav-height)',
      },

      animation: {
        'float': 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
} satisfies Config;