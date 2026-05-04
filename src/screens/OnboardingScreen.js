import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Organize Your Studies',
    description: 'Keep track of assignments, exams, and personal tasks in one beautifully designed space.',
    icon: 'calendar-outline',
  },
  {
    id: '2',
    title: 'Stay Focused',
    description: 'Use the minimal UI to reduce cognitive load and focus on what truly matters.',
    icon: 'eye-outline',
  },
  {
    id: '3',
    title: 'Track Your Progress',
    description: 'Complete tasks to build streaks and level up your productivity game.',
    icon: 'trending-up-outline',
  }
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('@onboarding_completed', 'true');
      navigation.replace('Home');
    } catch (e) {
      console.log('Error saving onboarding status', e);
    }
  };

  const nextSlide = () => {
    if (currentIndex < SLIDES.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      completeOnboarding();
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <BlurView intensity={90} tint="light" style={styles.glassCard}>
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={80} color={colors.primary} />
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </BlurView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Image source={require('../../assets/icon.png')} style={styles.bgImage} blurRadius={60} />
      <View style={styles.overlay} />
      
      <Animated.FlatList
        data={SLIDES}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        ref={slidesRef}
      />

      <View style={styles.footer}>
        <View style={styles.paginator}>
          {SLIDES.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return <Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={i.toString()} />;
          })}
        </View>

        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={nextSlide}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>{currentIndex === SLIDES.length - 1 ? "Get Started" : "Next"}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(242, 242, 247, 0.85)',
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  glassCard: {
    width: '100%',
    padding: spacing.xl,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.surfaceSolid,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  iconContainer: {
    marginBottom: spacing.l,
    padding: spacing.l,
    backgroundColor: 'rgba(0,0,0,0.05)', // Subtle gray
    borderRadius: borderRadius.full,
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.m,
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  footer: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  paginator: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginHorizontal: 4,
  },
  button: {
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    ...shadows.button,
  },
  buttonContent: {
    paddingVertical: spacing.l,
    alignItems: 'center',
    backgroundColor: colors.primary, // Solid indigo for maximum apple-contrast
  },
  buttonText: {
    color: '#FFF',
    fontSize: 19,
    fontWeight: '700',
  },
});
