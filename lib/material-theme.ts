// Material Design 3 (Material You) color system
export const materialColors = {
  primary: {
    main: '#6750A4', // M3 Primary
    light: '#9A82DB',
    dark: '#4F378B',
    container: '#EADDFF',
    onContainer: '#21005E',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#625B71', // M3 Secondary
    light: '#958DA5',
    dark: '#484259',
    container: '#E8DEF8',
    onContainer: '#1E192B',
    contrastText: '#FFFFFF',
  },
  tertiary: {
    main: '#7D5260', // M3 Tertiary
    light: '#A07C8B',
    dark: '#5B3F4A',
    container: '#FFD8E4',
    onContainer: '#370B1E',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#B3261E', // M3 Error
    light: '#DC362E',
    dark: '#8C1D18',
    container: '#F9DEDC',
    onContainer: '#410E0B',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#F2B8B5', // Light error (used for warnings)
    light: '#F9DEDC',
    dark: '#8C1D18',
    contrastText: '#601410',
  },
  info: {
    main: '#CAC4D0', // Light neutral-variant (used for info)
    light: '#E7E0EC',
    dark: '#49454F',
    contrastText: '#1D192B',
  },
  success: {
    main: '#A8DAB5', // Light custom green
    light: '#C6F0D0',
    dark: '#146C2E',
    contrastText: '#051F0E',
  },
  surface: {
    main: '#FFFBFE', // M3 Surface
    container: '#F3EDF7',
    containerLow: '#F7F2FA',
    containerHigh: '#ECE6F0',
    variant: '#E7E0EC',
    tint: '#DED7E6',
  },
  outline: {
    main: '#79747E', // M3 Outline
    variant: '#CAC4D0',
  },
  text: {
    primary: '#1C1B1F', // M3 On Surface
    secondary: '#49454F', // M3 On Surface Variant
    disabled: 'rgba(28, 27, 31, 0.38)',
  },
  // Dark mode colors
  dark: {
    primary: {
      main: '#D0BCFF', // M3 Dark Primary
      light: '#E9DDFF',
      dark: '#9A82DB',
      container: '#4F378B',
      onContainer: '#EADDFF',
      contrastText: '#381E72',
    },
    secondary: {
      main: '#CCC2DC', // M3 Dark Secondary
      light: '#E8DEF8',
      dark: '#958DA5',
      container: '#484259',
      onContainer: '#E8DEF8',
      contrastText: '#332D41',
    },
    tertiary: {
      main: '#EFB8C8', // M3 Dark Tertiary
      light: '#FFD8E4',
      dark: '#A07C8B',
      container: '#5B3F4A',
      onContainer: '#FFD8E4',
      contrastText: '#492532',
    },
    error: {
      main: '#F2B8B5', // M3 Dark Error
      light: '#F9DEDC',
      dark: '#DC362E',
      container: '#8C1D18',
      onContainer: '#F9DEDC',
      contrastText: '#601410',
    },
    surface: {
      main: '#1C1B1F', // M3 Dark Surface
      container: '#211F26',
      containerLow: '#1D1B20', 
      containerHigh: '#2B2930',
      variant: '#49454F',
      tint: '#3D383D',
    },
    outline: {
      main: '#938F99', // M3 Dark Outline
      variant: '#49454F',
    },
    text: {
      primary: '#E6E1E5', // M3 Dark On Surface
      secondary: '#CAC4D0', // M3 Dark On Surface Variant
      disabled: 'rgba(230, 225, 229, 0.38)',
    },
  },
};

// Material Design 3 elevation with proper shadow values
export const elevation = {
  level0: 'none',
  level1: 'shadow-[0_1px_2px_rgba(0,0,0,0.3),0_1px_3px_1px_rgba(0,0,0,0.15)]',
  level2: 'shadow-[0_1px_2px_rgba(0,0,0,0.3),0_2px_6px_2px_rgba(0,0,0,0.15)]',
  level3: 'shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_8px_3px_rgba(0,0,0,0.15)]',
  level4: 'shadow-[0_2px_3px_rgba(0,0,0,0.3),0_6px_10px_4px_rgba(0,0,0,0.15)]',
  level5: 'shadow-[0_4px_4px_rgba(0,0,0,0.3),0_8px_12px_6px_rgba(0,0,0,0.15)]',
};

// Material Design 3 typography scale with Roboto font
export const typography = {
  // Display styles
  displayLarge: 'text-[57px] font-normal leading-[64px] tracking-[-0.25px] font-[Roboto]',
  displayMedium: 'text-[45px] font-normal leading-[52px] tracking-0 font-[Roboto]',
  displaySmall: 'text-[36px] font-normal leading-[44px] tracking-0 font-[Roboto]',
  
  // Headline styles
  headlineLarge: 'text-[32px] font-normal leading-[40px] tracking-0 font-[Roboto]',
  headlineMedium: 'text-[28px] font-normal leading-[36px] tracking-0 font-[Roboto]',
  headlineSmall: 'text-[24px] font-normal leading-[32px] tracking-0 font-[Roboto]',
  
  // Title styles
  titleLarge: 'text-[22px] font-normal leading-[28px] tracking-0 font-[Roboto]',
  titleMedium: 'text-[16px] font-medium leading-[24px] tracking-[0.15px] font-[Roboto]',
  titleSmall: 'text-[14px] font-medium leading-[20px] tracking-[0.1px] font-[Roboto]',
  
  // Body styles
  bodyLarge: 'text-[16px] font-normal leading-[24px] tracking-[0.5px] font-[Roboto]',
  bodyMedium: 'text-[14px] font-normal leading-[20px] tracking-[0.25px] font-[Roboto]',
  bodySmall: 'text-[12px] font-normal leading-[16px] tracking-[0.4px] font-[Roboto]',
  
  // Label styles
  labelLarge: 'text-[14px] font-medium leading-[20px] tracking-[0.1px] font-[Roboto]',
  labelMedium: 'text-[12px] font-medium leading-[16px] tracking-[0.5px] font-[Roboto]',
  labelSmall: 'text-[11px] font-medium leading-[16px] tracking-[0.5px] font-[Roboto]',
};

// Material Design 3 spacing system (based on 4dp grid)
export const spacing = (multiplier: number) => `${multiplier * 4}px`;

// Material Design 3 breakpoints
export const breakpoints = {
  xs: '0px',      // Extra small devices
  sm: '600px',    // Small devices (phones, 600px and up)
  md: '840px',    // Medium devices (tablets, 840px and up)
  lg: '1200px',   // Large devices (landscape tablets, desktops, 1200px and up)
  xl: '1440px',   // Extra large devices (large desktops, 1440px and up)
};

// Material Design 3 shape (border radius)
export const shape = {
  none: '0',
  extraSmall: '4px',
  small: '8px',
  medium: '12px',
  large: '16px', 
  extraLarge: '28px',
  full: '9999px',
};

// Material Design 3 transitions
export const transitions = {
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',      // Standard curve
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',    // Emphasized curve (same as standard in MD3)
    emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1.0)', // For elements entering the screen
    emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',   // For elements exiting the screen
    legacy: 'cubic-bezier(0.4, 0, 0.2, 1)',      // Legacy Material Design 2.0 curve
  },
  duration: {
    short1: '50ms',
    short2: '100ms',
    short3: '150ms',
    short4: '200ms',
    medium1: '250ms',
    medium2: '300ms',
    medium3: '350ms',
    medium4: '400ms', 
    long1: '450ms',
    long2: '500ms',
    long3: '550ms',
    long4: '600ms',
    extraLong1: '700ms',
    extraLong2: '800ms',
    extraLong3: '900ms',
    extraLong4: '1000ms',
  },
}; 