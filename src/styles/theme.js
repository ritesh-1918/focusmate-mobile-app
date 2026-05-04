export const colors = {
  // The "Notion" Aesthetic - Minimalist, bespoke, professional
  primary: '#111111', // Almost black
  secondary: '#E63946', // Stark Carmine Red accent
  background: '#F9F9F9', // Very soft off-white
  surface: 'rgba(255, 255, 255, 0.9)', // High opacity white for minimal glass
  surfaceSolid: '#FFFFFF', // Pure White for cards
  text: '#1A1A1A', // Deep charcoal, softer than pure black
  textSecondary: '#808080', // Neutral gray
  border: '#EAEAEA', // Very soft border
  error: '#E63946', // Carmine Red
  gradientStart: '#FFFFFF',
  gradientEnd: '#F9F9F9',
};

export const spacing = {
  xs: 6,
  s: 12,
  m: 18,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '800', 
    color: colors.text,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: -0.2,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    letterSpacing: -0.1,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: -0.1,
  },
  caption: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    letterSpacing: 0,
  },
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  }
};

export const borderRadius = {
  s: 6,
  m: 12,
  l: 16, // Sharper, more web-like radius
  xl: 24,
  full: 9999,
};
