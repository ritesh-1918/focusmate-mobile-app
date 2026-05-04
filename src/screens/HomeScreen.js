import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows, borderRadius } from '../styles/theme';

const DUMMY_TASKS = [
  { id: '1', title: 'Complete React Native UI', time: '10:00 AM', completed: true },
  { id: '2', title: 'Review TumiCoders Submission', time: '01:00 PM', completed: false },
  { id: '3', title: 'Update GitHub Repository', time: '04:00 PM', completed: false },
  { id: '4', title: 'Plan Next Week Goals', time: '08:00 PM', completed: false },
];

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const renderTask = ({ item, index }) => {
    return (
      <Animated.View style={[
        styles.taskCard,
        { 
          opacity: fadeAnim, 
          transform: [{ translateY: slideAnim }] 
        }
      ]}>
        <View style={styles.taskInfo}>
          <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
            {item.completed && <Ionicons name="checkmark" size={16} color={colors.surface} />}
          </View>
          <View style={styles.taskTextContainer}>
            <Text style={[styles.taskTitle, item.completed && styles.taskTitleCompleted]}>{item.title}</Text>
            <Text style={styles.taskTime}>{item.time}</Text>
          </View>
        </View>
        <Ionicons name="ellipsis-vertical" size={20} color={colors.textSecondary} />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View>
          <Text style={styles.greeting}>Hello, Ritesh 👋</Text>
          <Text style={styles.subtitle}>Stay Focused, Stay Productive</Text>
        </View>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>R</Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.listContainer, { opacity: fadeAnim }]}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <FlatList
          data={DUMMY_TASKS}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <TouchableOpacity 
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.primaryButtonText}>Go to Profile</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.surface} style={{ marginLeft: spacing.s }} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
    paddingTop: spacing.xl,
    paddingBottom: spacing.m,
  },
  greeting: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '500',
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.card,
  },
  avatarText: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: spacing.l,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.m,
    marginTop: spacing.m,
  },
  flatListContent: {
    paddingBottom: spacing.xl,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: spacing.m,
    borderRadius: borderRadius.l,
    marginBottom: spacing.m,
    ...shadows.card,
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  checkboxCompleted: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  taskTextContainer: {
    justifyContent: 'center',
  },
  taskTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  taskTime: {
    ...typography.caption,
  },
  footer: {
    padding: spacing.l,
    paddingBottom: spacing.xl,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: spacing.m,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.button,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
