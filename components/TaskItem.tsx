import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TaskItemProps {
  task: string;
  onDelete: () => void;
  onEdit: () => void;
  onReminder:() => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit, onReminder}) => {
  return ( 
    <View style={styles.taskContainer}>
      <Text>{task}</Text>
      <View style={styles.buttonsContainer}>

      <TouchableOpacity onPress={onReminder} style={styles.reminderButton}>
      <Text>Set Reminder</Text>
    </TouchableOpacity>

        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Text>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
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

export default TaskItem;
