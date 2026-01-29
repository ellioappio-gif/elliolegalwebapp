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
        // ellio Brand Colors (from design system)
        brand: {
          primary: {
            900: "#394C9A", // Deep Indigo
            700: "#4a5fb8", // Medium Indigo
            500: "#5a6fb8", // Light Indigo
            300: "#85b0f2", // Sky Blue
            200: "#a8c8f5", // Soft Blue
            100: "#c5daf8", // Pale Blue
            50: "#dce8fb",  // Lighter Blue
            25: "#f0f5fd",  // Off White
          },
          indigo: "#394C9A",
          blue: "#5a6fb8",
          sky: "#85b0f2",
          soft: "#a8c8f5",
          pale: "#c5daf8",
        },
        
        // Semantic Colors
        semantic: {
          success: "#10b981",
          "success-light": "#d1fae5",
          warning: "#f59e0b", 
          "warning-light": "#fef3c7",
          error: "#ef4444",
          "error-light": "#fee2e2",
          info: "#3b82f6",
          "info-light": "#dbeafe",
        },

        // Surface Colors
        surface: {
          primary: "#FFFFFF",
          secondary: "#f9f9fe",
          subtle: "#f0f5fd",
        },

        // Text Colors
        text: {
          primary: "#4a5568",
          secondary: "#718096",
          brand: "#394C9A",
          accent: "#85b0f2",
        },

        // Border Colors  
        border: {
          subtle: "#a8c8f5",
          medium: "#5a6fb8",
        },
      },
      
      fontFamily: {
        display: ['Quicksand', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', fontWeight: '600' }],
        'display': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
      },

      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #394C9A, #5a6fb8)',
        'gradient-brand-hover': 'linear-gradient(135deg, #4a5fb8, #6667d4)',
        'gradient-hero': 'linear-gradient(180deg, #f0f5fd 0%, #FFFFFF 100%)',
        'gradient-card': 'linear-gradient(135deg, #FFFFFF, #f9f9fe)',
        'gradient-accent': 'linear-gradient(135deg, #85b0f2, #a8c8f5)',
      },

      boxShadow: {
        'brand-card': '0 4px 20px rgba(57, 76, 154, 0.1)',
        'brand-card-hover': '0 10px 40px rgba(57, 76, 154, 0.15)',
        'brand-button': '0 4px 15px rgba(57, 76, 154, 0.2)',
        'brand-button-hover': '0 8px 25px rgba(57, 76, 154, 0.35)',
        'brand-xl': '0 10px 40px rgba(57, 76, 154, 0.15)',
      },

      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      
      borderRadius: {
        'ellio': '12px',
        'ellio-lg': '16px',
        'ellio-xl': '20px',
      }
    },
  },
  plugins: [],
} satisfies Config;