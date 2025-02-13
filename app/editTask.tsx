import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { loadTasks, saveTasks } from '../utils/storage';
import { LITTLE_BLACK_GRADIENT } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
};

const EditTaskScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get task ID from params

  // State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Load Task Details
  useEffect(() => {
    const fetchTask = async () => {
      const tasks: Task[] = await loadTasks();
      const taskToEdit = tasks.find((task) => task.id === id);
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
        setDueDate(new Date(taskToEdit.dueDate));
      }
    };
    fetchTask();
  }, [id]);

  // Handle Date Change
  const onChangeDate = (event: any, selectedDate: any) => {
    setShowDatePicker(false);
    if (selectedDate) setDueDate(selectedDate);
  };

  // Handle Save
  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      alert('Please enter a valid title and description.');
      return;
    }

    const tasks = await loadTasks();
    const updatedTasks = tasks.map((task: Task) =>
      task.id === id
        ? { ...task, title, description, dueDate: dueDate.toISOString() }
        : task
    );

    await saveTasks(updatedTasks);
    alert('Task Updated!');
    router.push('/tasks'); // Navigate back to task list
  };

  return (
    <LinearGradient
      colors={
        LITTLE_BLACK_GRADIENT as unknown as readonly [
          string,
          string,
          ...string[]
        ]
      }
      style={styles.container}
    >
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#007AFF" />
      </TouchableOpacity>
      <Text style={styles.title}>✏️ Edit Task</Text>
      <View style={styles.inputContainer}>
        {/* Title Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter Task Title"
          value={title}
          onChangeText={setTitle}
        />

        {/* Description Input */}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter Task Description"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Date Picker */}
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateText}>📅 </Text>
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        </TouchableOpacity>
      </View>
      {/* Save Task Button */}
      <TouchableOpacity onPress={handleSave} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Edit Changes</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    marginTop: 40,
  },
  subContainer: { justifyContent: 'center' },
  inputContainer: { marginTop: 40 },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  backButton: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  backButtonText: {
    fontSize: 24,
    color: '#007AFF',
  },
  dateButton: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    backgroundColor: '#2149C1',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    position: 'absolute',
    bottom: 40,
    flex: 1,
    width: '100%',
    marginHorizontal: 20,
  },
  buttonText: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
});

export default EditTaskScreen;
