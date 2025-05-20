/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../components/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Material Design 3 color system
        primary: {
          main: "#6750A4",
          light: "#9A82DB",
          dark: "#4F378B",
          container: "#EADDFF",
          onContainer: "#21005E",
          foreground: "#FFFFFF",
        },
        secondary: {
          main: "#625B71",
          light: "#958DA5",
          dark: "#484259",
          container: "#E8DEF8",
          onContainer: "#1E192B",
          foreground: "#FFFFFF",
        },
        tertiary: {
          main: "#7D5260",
          light: "#A07C8B",
          dark: "#5B3F4A",
          container: "#FFD8E4",
          onContainer: "#370B1E",
          foreground: "#FFFFFF",
        },
        error: {
          main: "#B3261E",
          light: "#DC362E",
          dark: "#8C1D18",
          container: "#F9DEDC",
          onContainer: "#410E0B",
          foreground: "#FFFFFF",
        },
        surface: {
          main: "#FFFBFE",
          container: "#F3EDF7",
          containerLow: "#F7F2FA",
          containerHigh: "#ECE6F0",
          variant: "#E7E0EC",
          tint: "#DED7E6",
        },
        outline: {
          main: "#79747E",
          variant: "#CAC4D0",
        },
        text: {
          primary: "#1C1B1F",
          secondary: "#49454F",
          disabled: "rgba(28, 27, 31, 0.38)",
        },
        // Dark mode Material Design 3 colors
        dark: {
          primary: {
            main: "#D0BCFF",
            light: "#E9DDFF",
            dark: "#9A82DB",
            container: "#4F378B",
            onContainer: "#EADDFF",
            contrastText: "#381E72",
          },
          secondary: {
            main: "#CCC2DC",
            light: "#E8DEF8",
            dark: "#958DA5",
            container: "#484259",
            onContainer: "#E8DEF8",
            contrastText: "#332D41",
          },
          tertiary: {
            main: "#EFB8C8",
            light: "#FFD8E4",
            dark: "#A07C8B",
            container: "#5B3F4A",
            onContainer: "#FFD8E4",
            contrastText: "#492532",
          },
          error: {
            main: "#F2B8B5",
            light: "#F9DEDC",
            dark: "#DC362E",
            container: "#8C1D18",
            onContainer: "#F9DEDC",
            contrastText: "#601410",
          },
          surface: {
            main: "#1C1B1F",
            container: "#211F26",
            containerLow: "#1D1B20",
            containerHigh: "#2B2930",
            variant: "#49454F",
            tint: "#3D383D",
          },
          outline: {
            main: "#938F99",
            variant: "#49454F",
          },
          text: {
            primary: "#E6E1E5",
            secondary: "#CAC4D0",
            disabled: "rgba(230, 225, 229, 0.38)",
          },
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        none: "0",
        xs: "4px",
        sm: "8px",
        DEFAULT: "12px",
        md: "12px",
        lg: "16px",
        xl: "28px",
        "2xl": "32px",
        full: "9999px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        ripple: {
          "0%": { transform: "translate(-50%, -50%) scale(0)", opacity: 0.6 },
          "100%": { transform: "translate(-50%, -50%) scale(2.5)", opacity: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        ripple: "ripple 0.65s cubic-bezier(0.2, 0, 0, 1)",
      },
      boxShadow: {
        // Material Design 3 elevation system
        'md-1': '0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)',
        'md-2': '0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)',
        'md-3': '0 1px 3px rgba(0,0,0,0.3), 0 4px 8px 3px rgba(0,0,0,0.15)',
        'md-4': '0 2px 3px rgba(0,0,0,0.3), 0 6px 10px 4px rgba(0,0,0,0.15)',
        'md-5': '0 4px 4px rgba(0,0,0,0.3), 0 8px 12px 6px rgba(0,0,0,0.15)',
      },
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 