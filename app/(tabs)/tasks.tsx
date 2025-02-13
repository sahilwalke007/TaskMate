import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { loadTasks, saveTasks } from '../../utils/storage'; // Import storage functions
import { LinearGradient } from 'expo-linear-gradient';
import { COLOR_ORANGE_LIGHT_GRADIENT } from '@/constants/Colors';

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
};

const TasksScreen = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks when the screen opens
  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await loadTasks();
      setTasks(storedTasks as Task[]);
    };

    fetchTasks();
  }, [tasks]);

  // Handle Delete Task
  const handleDelete = async (taskId: string) => {
    Alert.alert('Delete Task?', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updatedTasks = tasks.filter((task) => task.id !== taskId);
          setTasks(updatedTasks);
          await saveTasks(updatedTasks); // Save updated tasks
        },
      },
    ]);
  };

  const handleEdit = (task: Task) => {
    router.push(`/editTask?id=${task.id}`);
  };

  return (
    <LinearGradient
      colors={
        COLOR_ORANGE_LIGHT_GRADIENT as unknown as readonly [
          string,
          string,
          ...string[]
        ]
      }
      style={styles.container}
    >
      <Text style={styles.title}>📋 Your Tasks</Text>

      {tasks.length === 0 ? (
        <Text style={styles.noTasks}>No tasks available.</Text>
      ) : (
        <FlatList
          data={tasks}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <View style={styles.topView}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.buttonText}>🗑️ Delete</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.taskDesc}>{item.description}</Text>
              <Text style={styles.taskDate}>
                Due: {new Date(item.dueDate).toDateString()}
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEdit(item)}
                >
                  <Text style={styles.buttonText}>✏️ Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <Button
        title="Create New Task"
        onPress={() => router.push('./createTask')}
        color="#007AFF"
      />
    </LinearGradient>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 30,
    marginTop: 10,
    textAlign: 'center',
    color: '#2C3E50',
  },
  noTasks: {
    textAlign: 'center',
    fontSize: 18,
    color: '#BDC3C7',
  },
  taskItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495E',
  },
  taskDesc: {
    fontSize: 16,
    color: '#7F8C8D',
    marginVertical: 8,
  },
  taskDate: {
    fontSize: 14,
    color: '#2980B9',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  editButton: {
    backgroundColor: '#F39C12',
    borderRadius: 8,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 48,
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default TasksScreen;
