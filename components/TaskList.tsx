import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { IconButton, List } from 'react-native-paper';


const formatTime = (timeInMilliseconds: number): string => {
  const minutes = Math.floor(timeInMilliseconds / 60000); // 1 minute = 60,000 milliseconds
  const seconds = Math.floor((timeInMilliseconds % 60000) / 1000); // Remaining milliseconds divided by 1000 to get seconds

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

interface TaskListProps {
  tasks: string[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  onReminder: (index: number) => void;
  editingIndex: number | null;
  onEditFinish: (editedTask: string) => void;
  remainingTimes: number[];
}

const TaskList: React.FC<TaskListProps> = ({
  tasks, 
  onDelete,
  onEdit,
  onReminder,
  editingIndex,
  onEditFinish,
  remainingTimes }) => {
  const [editedTask, setEditedTask] = useState('');
  const handleEditFinish = () => {
    onEditFinish(editedTask);
    setEditedTask('');
  };

  return (     
    <View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            {editingIndex === index ? (
              <>
                <TextInput
                  style={styles.editInput}
                  value={editedTask}
                  onChangeText={setEditedTask}
                  placeholder="Edit task"
                />
                <TouchableOpacity onPress={handleEditFinish} style={styles.editButton}>
                  <Text>Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text>{item}</Text>
                <View style={styles.buttonsContainer}>

                {remainingTimes[index] > 0 && (
                  <Text style={styles.timerText}>
                    {formatTime(remainingTimes[index])}
                  </Text>
                )}

                <TouchableOpacity onPress={() => onReminder(index)} style={styles.reminderButton}>
                   <Text>Reminder</Text>
                </TouchableOpacity>
                  <TouchableOpacity onPress={() => onEdit(index)} style={styles.editButton}>
                    <Text>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onDelete(index)} style={styles.deleteButton}>
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue', // Customize the color as needed
    marginLeft: 0, // Add some spacing between the reminder button and timer
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  editButton: {
    padding: 8,
    backgroundColor: 'lightblue',
    borderRadius: 4,
    marginRight: 8,
  },
  reminderButton: {
    padding: 8,
    backgroundColor: 'lightgreen',
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    padding: 8,
    backgroundColor: 'red',
    borderRadius: 4,
  },
});

export default TaskList;
