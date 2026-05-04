import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Animated, Image, KeyboardAvoidingView, Platform, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Study');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const categories = [
    { name: 'Study', icon: 'book', color: '#111111' }, // Stark Black
    { name: 'Assignment', icon: 'document-text', color: '#E63946' }, // Carmine Red
    { name: 'Personal', icon: 'person', color: '#808080' } // Neutral Gray
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadTasks();
    });
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    return unsubscribe;
  }, [navigation]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('@tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        const initialTask = [{ id: Date.now().toString(), title: 'Welcome to FocusMate!', category: 'Personal', completed: false }];
        setTasks(initialTask);
        await AsyncStorage.setItem('@tasks', JSON.stringify(initialTask));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(newTasks));
    } catch (e) {
      console.error(e);
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() === '') return;
    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
      category: selectedCategory,
      completed: false,
    };
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setNewTaskTitle('');
    setModalVisible(false);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    updatedTasks.sort((a, b) => Number(a.completed) - Number(b.completed));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Delete", 
        style: "destructive",
        onPress: () => {
          const updatedTasks = tasks.filter(task => task.id !== id);
          setTasks(updatedTasks);
          saveTasks(updatedTasks);
        }
      }
    ]);
  };

  const renderTask = ({ item }) => {
    const categoryInfo = categories.find(c => c.name === item.category) || categories[0];
    
    return (
      <TouchableOpacity 
        style={styles.taskCardContainer} 
        activeOpacity={0.8} 
        onPress={() => toggleTask(item.id)}
        onLongPress={() => deleteTask(item.id)}
      >
        <BlurView intensity={90} tint="light" style={styles.taskCard}>
          <View style={styles.taskInfo}>
            <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
              {item.completed && <Ionicons name="checkmark" size={16} color={colors.surfaceSolid} />}
            </View>
            <View style={styles.taskTextContainer}>
              <Text style={[styles.taskTitle, item.completed && styles.taskTitleCompleted]}>{item.title}</Text>
              <View style={styles.categoryBadge}>
                <Ionicons name={categoryInfo.icon} size={12} color={categoryInfo.color} style={{ marginRight: 4 }} />
                <Text style={[styles.categoryText, { color: categoryInfo.color }]}>{item.category}</Text>
              </View>
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    );
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? completedCount / tasks.length : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Image source={require('../../assets/icon.png')} style={styles.bgImage} blurRadius={60} />
      <View style={styles.overlay} />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Today</Text>
            <Text style={styles.subtitle}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={24} color={colors.surfaceSolid} />
            </View>
          </TouchableOpacity>
        </View>

        <BlurView intensity={90} tint="light" style={styles.progressCard}>
          <Text style={styles.progressTitle}>Daily Progress</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>{completedCount} of {tasks.length} tasks completed</Text>
        </BlurView>

        <View style={styles.listContainer}>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={renderTask}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: spacing.xxl * 3 }}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="leaf-outline" size={60} color={colors.textSecondary} />
                <Text style={styles.emptyText}>You're all caught up!</Text>
              </View>
            }
          />
        </View>
      </Animated.View>

      <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={() => setModalVisible(true)}>
        <BlurView intensity={100} tint="dark" style={styles.fabBlur}>
          <Ionicons name="add" size={32} color={colors.surfaceSolid} />
        </BlurView>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFillObject} />
            <KeyboardAvoidingView 
              behavior={Platform.OS === "ios" ? "padding" : "height"} 
              style={styles.modalContainer}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>New Task</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                    <Ionicons name="close-circle" size={30} color={colors.textSecondary} />
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="What do you need to do?"
                  placeholderTextColor={colors.textSecondary}
                  value={newTaskTitle}
                  onChangeText={setNewTaskTitle}
                  autoFocus={true}
                  enablesReturnKeyAutomatically
                  returnKeyType="done"
                  onSubmitEditing={addTask}
                />

                <Text style={styles.categoryLabel}>Category</Text>
                <View style={styles.categorySelector}>
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat.name}
                      style={[
                        styles.categoryOption,
                        selectedCategory === cat.name && { backgroundColor: cat.color, borderColor: cat.color }
                      ]}
                      onPress={() => setSelectedCategory(cat.name)}
                    >
                      <Ionicons 
                        name={cat.icon} 
                        size={16} 
                        color={selectedCategory === cat.name ? colors.surfaceSolid : cat.color} 
                      />
                      <Text style={[
                        styles.categoryOptionText,
                        selectedCategory === cat.name ? { color: colors.surfaceSolid } : { color: cat.color }
                      ]}>
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={addTask}>
                  <Text style={styles.saveButtonText}>Save Task</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  bgImage: { position: 'absolute', width: '100%', height: '100%', opacity: 0.15 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(242, 242, 247, 0.85)' },
  content: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
    paddingTop: spacing.l,
    paddingBottom: spacing.m,
  },
  greeting: { ...typography.h1 },
  subtitle: { ...typography.bodyBold, color: colors.textSecondary, marginTop: 4 },
  avatarPlaceholder: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    ...shadows.card,
  },
  progressCard: {
    marginHorizontal: spacing.l,
    padding: spacing.l,
    borderRadius: borderRadius.l,
    overflow: 'hidden',
    borderWidth: 1, borderColor: colors.surfaceSolid,
    backgroundColor: colors.surface, // more white
    marginBottom: spacing.l,
    ...shadows.card,
  },
  progressTitle: { ...typography.bodyBold, marginBottom: spacing.m },
  progressBarContainer: {
    height: 10,
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: spacing.s,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  progressText: { ...typography.caption },
  listContainer: { flex: 1, paddingHorizontal: spacing.l },
  taskCardContainer: { marginBottom: spacing.m, borderRadius: borderRadius.l, ...shadows.card },
  taskCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: spacing.m, borderRadius: borderRadius.l,
    overflow: 'hidden', borderWidth: 1, borderColor: colors.surfaceSolid,
    backgroundColor: colors.surface,
  },
  taskInfo: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    width: 28, height: 28, borderRadius: 14,
    borderWidth: 2, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center',
    marginRight: spacing.m, backgroundColor: colors.surfaceSolid,
  },
  checkboxCompleted: { backgroundColor: colors.primary, borderColor: colors.primary },
  taskTextContainer: { justifyContent: 'center' },
  taskTitle: { ...typography.bodyBold, color: colors.text, marginBottom: 4 },
  taskTitleCompleted: { textDecorationLine: 'line-through', color: colors.textSecondary, fontWeight: '400' },
  categoryBadge: { flexDirection: 'row', alignItems: 'center' },
  categoryText: { fontSize: 13, fontWeight: '600' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: spacing.xxl * 2 },
  emptyText: { ...typography.body, color: colors.textSecondary, marginTop: spacing.m },
  fab: {
    position: 'absolute', bottom: spacing.xl, right: spacing.xl,
    borderRadius: 30, overflow: 'hidden', ...shadows.button,
  },
  fabBlur: { width: 60, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary },
  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  modalContainer: { width: '100%' },
  modalContent: {
    backgroundColor: colors.surfaceSolid,
    borderTopLeftRadius: borderRadius.xl, borderTopRightRadius: borderRadius.xl,
    padding: spacing.xl, paddingBottom: 50,
    ...shadows.card,
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl },
  modalTitle: { ...typography.h3 },
  input: {
    backgroundColor: colors.background, borderRadius: borderRadius.m,
    padding: spacing.l, fontSize: 19, marginBottom: spacing.xl,
    color: colors.text, fontWeight: '500',
  },
  categoryLabel: { ...typography.bodyBold, marginBottom: spacing.m },
  categorySelector: { flexDirection: 'row', marginBottom: spacing.xl, gap: spacing.s },
  categoryOption: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.m, paddingVertical: 10,
    borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.border,
  },
  categoryOptionText: { fontSize: 15, fontWeight: '600', marginLeft: 6 },
  saveButton: {
    backgroundColor: colors.primary, borderRadius: borderRadius.l,
    padding: spacing.m, alignItems: 'center', ...shadows.button,
  },
  saveButtonText: { color: colors.surfaceSolid, fontSize: 19, fontWeight: '700' },
});
