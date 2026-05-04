export const colors = {
  // Pure Apple-like palette
  primary: '#5856D6', // iOS Indigo
  secondary: '#34C759', // iOS Green
  background: '#F2F2F7', // iOS Standard Light Gray Background
  surface: 'rgba(255, 255, 255, 0.75)', // Slightly more opaque glass
  surfaceSolid: '#FFFFFF', // Pure White for cards
  text: '#000000',
  textSecondary: '#8E8E93',
  border: 'rgba(60, 60, 67, 0.1)', // iOS separator color
  error: '#FF3B30', // iOS Red
  gradientStart: '#E0E7FF',
  gradientEnd: '#F3E8FF',
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
    fontSize: 34,
    fontWeight: '800', // Heavier weight for Apple feel
    color: colors.text,
    letterSpacing: 0.38,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 0.36,
  },
  h3: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: -0.26,
  },
  body: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.text,
    letterSpacing: -0.41,
  },
  bodyBold: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: -0.41,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: -0.08,
  },
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  button: {
    shadowColor: '#5856D6', // Indigo shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  }
};

export const borderRadius = {
  s: 10,
  m: 16, // Smoother squircle for small elements
  l: 24, // Smoother squircle for cards
  xl: 36,
  full: 9999,
};
