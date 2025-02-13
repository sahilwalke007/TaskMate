import AsyncStorage from '@react-native-async-storage/async-storage';

// Key for storing tasks
const TASKS_STORAGE_KEY = 'TASKS_LIST';

// Save tasks to AsyncStorage
export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

// Load tasks from AsyncStorage
export const loadTasks = async () => {
  try {
    const tasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

// Clear all tasks (useful for debugging)
export const clearTasks = async () => {
  try {
    await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing tasks:', error);
  }
};
