import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Task = { id: string; text: string };

type TaskContextType = {
  tasks: Task[];
  addTask: (text: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: any) {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load saved tasks
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await AsyncStorage.getItem('TASKS');
    if (data) setTasks(JSON.parse(data));
  };

  // Save tasks whenever changed
  useEffect(() => {
    AsyncStorage.setItem('TASKS', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    setTasks(prev => [...prev, { id: Date.now().toString(), text }]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used inside TaskProvider');
  return context;
}
