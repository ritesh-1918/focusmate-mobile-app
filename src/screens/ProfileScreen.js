import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';

export default function ProfileScreen({ navigation }) {
  const [stats, setStats] = useState({ completed: 0, total: 0 });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadStats();
    });
    loadStats();
    return unsubscribe;
  }, [navigation]);

  const loadStats = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('@tasks');
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        const completed = tasks.filter(t => t.completed).length;
        setStats({ completed, total: tasks.length });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleReset = () => {
    Alert.alert("Reset App", "This will delete all tasks and show onboarding again. Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Reset", 
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.replace('Onboarding');
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Image source={require('../../assets/icon.png')} style={styles.bgImage} blurRadius={60} />
      <View style={styles.overlay} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={colors.primary} />
          <Text style={styles.backText}>Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        
        <BlurView intensity={90} tint="light" style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={50} color={colors.surfaceSolid} />
          </View>
          <Text style={styles.name}>Ritesh</Text>
          <Text style={styles.course}>Student</Text>
        </BlurView>

        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsContainer}>
          <BlurView intensity={90} tint="light" style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(88, 86, 214, 0.1)' }]}>
              <Ionicons name="checkmark-done" size={28} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Tasks Done</Text>
          </BlurView>
          
          <BlurView intensity={90} tint="light" style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(52,199,89,0.1)' }]}>
              <Ionicons name="list" size={28} color={colors.secondary} />
            </View>
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </BlurView>
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Ionicons name="refresh" size={22} color={colors.error} style={{ marginRight: 8 }} />
          <Text style={styles.resetText}>Reset App Data</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  bgImage: { position: 'absolute', width: '100%', height: '100%', opacity: 0.15 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(242, 242, 247, 0.85)' },
  header: { flexDirection: 'row', alignItems: 'center', padding: spacing.m },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backText: { ...typography.body, color: colors.primary, marginLeft: 4 },
  content: { flex: 1, padding: spacing.l },
  profileCard: {
    borderRadius: borderRadius.xl, padding: spacing.xl,
    alignItems: 'center', marginBottom: spacing.xl,
    overflow: 'hidden', borderWidth: 1, borderColor: colors.surfaceSolid,
    backgroundColor: colors.surface, ...shadows.card,
  },
  avatar: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: spacing.m, ...shadows.card,
  },
  name: { ...typography.h2, marginBottom: 4 },
  course: { ...typography.body, color: colors.textSecondary },
  sectionTitle: { ...typography.h3, marginBottom: spacing.m },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xxl },
  statCard: {
    flex: 1, borderRadius: borderRadius.l, padding: spacing.l,
    alignItems: 'center', marginHorizontal: spacing.xs,
    overflow: 'hidden', borderWidth: 1, borderColor: colors.surfaceSolid,
    backgroundColor: colors.surface, ...shadows.card,
  },
  iconContainer: {
    width: 60, height: 60, borderRadius: 30,
    justifyContent: 'center', alignItems: 'center', marginBottom: spacing.m,
  },
  statValue: { ...typography.h2, marginBottom: 2 },
  statLabel: { ...typography.caption },
  resetButton: {
    flexDirection: 'row', backgroundColor: 'rgba(255, 59, 48, 0.1)',
    paddingVertical: spacing.l, borderRadius: borderRadius.l,
    justifyContent: 'center', alignItems: 'center', marginTop: 'auto',
  },
  resetText: { color: colors.error, fontSize: 18, fontWeight: '700' },
});
