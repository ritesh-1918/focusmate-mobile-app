export const colors = {
  // Apple-like neutral palette
  primary: '#007AFF', // iOS Blue
  secondary: '#34C759', // iOS Green
  background: '#F2F2F7', // iOS Light Gray Background
  surface: 'rgba(255, 255, 255, 0.7)', // Translucent surface for BlurView
  surfaceSolid: '#FFFFFF',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: 'rgba(0,0,0,0.1)',
  error: '#FF3B30', // iOS Red
  gradientStart: '#E0E7FF',
  gradientEnd: '#F3E8FF',
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 0.4,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 0.35,
  },
  h3: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: 0.35,
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
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  button: {
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  }
};

export const borderRadius = {
  s: 8,
  m: 14, // Standard iOS corner radius for smaller elements
  l: 20, // Standard iOS corner radius for cards
  xl: 32,
  full: 9999,
};
