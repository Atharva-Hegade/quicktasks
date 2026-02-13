import React, { useState, useRef } from 'react';
import { useTasks } from '../../context/TaskContext';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated
} from 'react-native';

export default function Tasks() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const scale = useRef(new Animated.Value(1)).current;


const { tasks: contextTasks, addTask } = useTasks();

  const handleAddTask = () => {
    if (!task.trim()) return;

    Animated.sequence([
      Animated.timing(scale, { toValue: 1.1, duration: 120, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();

    addTask(task);
    setTask('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QuickTasks Pro</Text>

      <TextInput
        value={task}
        onChangeText={setTask}
        placeholder="Enter new task"
        style={styles.input}
      />

      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={{ color: "#fff", fontWeight: 'bold' }}>Add Task</Text>
        </TouchableOpacity>
      </Animated.View>

      <FlatList
        data={contextTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafb' // light background
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111' // dark text
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#111'
  },
  button: {
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600'
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  cardText: {
    color: '#111'
  }
});

