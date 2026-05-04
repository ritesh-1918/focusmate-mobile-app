export const colors = {
  primary: '#4F46E5', // Indigo
  secondary: '#10B981', // Emerald
  background: '#F9FAFB', // Light gray
  surface: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  error: '#EF4444',
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
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 14,
    color: '#9CA3AF',
  },
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  button: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  }
};

export const borderRadius = {
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  full: 9999,
};
