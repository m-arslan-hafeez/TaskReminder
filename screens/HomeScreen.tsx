import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Appbar, List, TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import TaskList from '../components/TaskList';
// import alert from 'alert'

const HomeScreen: React.FC = () => {
  const [tasksReminder, setTasksReminder] = useState<{ text: string; reminder?: Date }[]>([]);
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<string>('');
  const [remainingTimes, setRemainingTimes] = useState<number[]>([]);
  const [countdownIntervals, setCountdownIntervals] = useState<NodeJS.Timeout[]>([]);

  
  useEffect(() => {
    const countdownCleanup = () => {
      countdownIntervals.forEach(intervalId => clearInterval(intervalId));
    };
    return countdownCleanup;
  }, []);

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
      setNewTask(''); // Clear the input field
    }
  };
  
  const setReminder = (index: number) => {
    const currentDateTime = new Date();
    const reminderDateTime = new Date(currentDateTime.getTime() + 60 * 1000);
    const timeDifference = reminderDateTime.getTime() - currentDateTime.getTime();
    const updatedTasksReminder = [...tasksReminder];
    updatedTasksReminder[index] = { text: tasks[index], reminder: reminderDateTime };
    const updatedRemainingTimes = [...remainingTimes];
    updatedRemainingTimes[index] = timeDifference;
    setTasksReminder(updatedTasksReminder);
    setRemainingTimes(updatedRemainingTimes);


    const countdownInterval = setInterval(() => {
      const updatedRemainingTimes = [...remainingTimes];
      updatedRemainingTimes[index] = Math.max(updatedRemainingTimes[index] - 1000, 0);
      setRemainingTimes(updatedRemainingTimes);
    }, 1000);
    
    setCountdownIntervals([...countdownIntervals, countdownInterval]);
  };

  const deleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
  };

  const finishEditing = (editedTask: string) => {
    if (editingIndex !== null) {
      const newTasks = [...tasks];
      newTasks[editingIndex] = editedTask;
      setTasks(newTasks);
      setEditingIndex(null);
    }
  };

  return (
    
    <View style={styles.container}>

      <Appbar.Header>
        <Appbar.Content title="Task Reminder" />
      </Appbar.Header>

      <PaperTextInput
        label="New Task"
        value={newTask}
        onChangeText={setNewTask}
        style={styles.input}
        multiline={true} // Enable multiline input
        numberOfLines={1} // Set the initial number of lines (adjust as needed)
      />

      <PaperButton mode="contained" onPress={addTask} style={styles.button}>
        Add Task
      </PaperButton>

      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onEdit={startEditing}
        onReminder={setReminder}
        editingIndex={editingIndex}
        onEditFinish={finishEditing}
        remainingTimes={remainingTimes}
      /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});

export default HomeScreen;
