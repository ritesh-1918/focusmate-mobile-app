import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows, borderRadius } from '../styles/theme';

export default function ProfileScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>R</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="star" size={14} color={colors.surface} />
            </View>
          </View>
          <Text style={styles.name}>Ritesh</Text>
          <Text style={styles.course}>Electronics & Communication</Text>
          
          <View style={styles.goalContainer}>
            <Ionicons name="rocket" size={18} color={colors.primary} />
            <Text style={styles.goalText}>Goal: Become a Mobile App Developer</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: colors.gradientStart }]}>
              <Ionicons name="checkmark-done" size={24} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Tasks Completed</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="flame" size={24} color="#D97706" />
            </View>
            <Text style={styles.statValue}>5 Days</Text>
            <Text style={styles.statLabel}>Current Streak</Text>
          </View>
        </View>

      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <TouchableOpacity 
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.surface} style={{ marginRight: spacing.s }} />
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.l,
    justifyContent: 'center',
  },
  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.l,
    ...shadows.card,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.m,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.button,
  },
  avatarText: {
    color: colors.surface,
    fontSize: 40,
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.secondary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.surface,
  },
  name: {
    ...typography.h1,
    marginBottom: spacing.xs,
  },
  course: {
    ...typography.body,
    marginBottom: spacing.l,
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gradientStart,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.full,
  },
  goalText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: spacing.s,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    padding: spacing.l,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    ...shadows.card,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  statValue: {
    ...typography.h2,
    marginBottom: 2,
  },
  statLabel: {
    ...typography.caption,
  },
  footer: {
    padding: spacing.l,
    paddingBottom: spacing.xl,
  },
  backButton: {
    flexDirection: 'row',
    backgroundColor: colors.text,
    paddingVertical: spacing.m,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.button,
  },
  backButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
