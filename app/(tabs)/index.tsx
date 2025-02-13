import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLOR_BLUE_LIGHT_GRADIENT } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { getDeviceWidth, getDeviceHeight } from '@/constants/constant';
import { loadTasks } from '@/utils/storage';

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
};
const Home = () => {
  const router = useRouter();

  // Sample state for task counts (you can fetch from AsyncStorage or state management)
  const [totalTasks, setTotalTasks] = useState(0); // Placeholder value
  const [pendingTasks, setPendingTasks] = useState(0); // Placeholder value
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks when the screen opens
  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await loadTasks();
      setTasks(storedTasks as Task[]);
      setTotalTasks(storedTasks?.length);
      setPendingTasks(storedTasks?.length);
    };

    fetchTasks();
  }, [tasks]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      bounces={false}
    >
      <LinearGradient
        colors={
          COLOR_BLUE_LIGHT_GRADIENT as unknown as readonly [
            string,
            string,
            ...string[]
          ]
        }
        //style={styles.container}
      >
        {/* Welcome Section with Logo */}
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
          {/* Assuming you have a logo image */}
          <Text style={styles.welcomeText}>Welcome to Task Manager!</Text>
          <Text style={styles.subtitle}>
            Organize your day, one task at a time.
          </Text>
        </View>

        {/* Task Status Section with Icons */}
        <View style={styles.taskStatusContainer}>
          <View style={styles.statusBox}>
            <Ionicons name="list" size={50} color="#007AFF" />
            <Text style={styles.statusLabel}>Total Tasks</Text>
            <Text style={styles.statusValue}>{totalTasks}</Text>
          </View>
          <View style={styles.statusBox}>
            <Ionicons name="time" size={50} color="#FF6347" />
            <Text style={styles.statusLabel}>Pending Tasks</Text>
            <Text style={styles.statusValue}>{pendingTasks}</Text>
          </View>
        </View>

        {/* Motivational Quote */}
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>
            "The key to success is to focus on goals, not obstacles."
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/tasks')}
          >
            <Text style={styles.buttonText}>View Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/createTask')}
          >
            <Text style={styles.buttonText}>Create New Task</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  logo: {
    width: getDeviceWidth(),
    height: getDeviceHeight() * 0.4,
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
  taskStatusContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  statusBox: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 150,
    alignItems: 'center',
    marginTop: 20,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 5,
  },
  quoteContainer: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
