import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { saveTasks, loadTasks } from '../../utils/storage';
import { LITTLE_BLACK_GRADIENT } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const CreateTaskScreen = () => {
  const router = useRouter();

  // State for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  // Handle Date Selection
  const onChangeDate = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  // Save task to AsyncStoragesahil
  const handleSaveTask = async () => {
    if (!title.trim() || !description.trim()) {
      alert('Please enter both Title and Description.');
      return;
    }

    const newTask = {
      id: Date.now().toString(), // Unique ID
      title,
      description,
      dueDate: dueDate.toISOString(),
    };

    const existingTasks = await loadTasks(); // Load existing tasks
    const updatedTasks = [...existingTasks, newTask];

    await saveTasks(updatedTasks); // Save updated tasks

    alert('Task Saved!');
    router.push('./tasks');
    setTitle('');
    setDescription('');
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
      <Text style={styles.title}>📝 Create New Task</Text>
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
      <TouchableOpacity onPress={handleSaveTask} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Save Task</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    marginTop: 42,
  },
  inputContainer: { marginTop: 40 },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000000',
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
    bottom: 120,
    flex: 1,
    width: '100%',
    marginHorizontal: 20,
  },
  buttonText: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
});

export default CreateTaskScreen;
