import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import TaskItem from '../components/TaskItem';
import styles from '../../assets/styles/styles';
import initialTasks from '../../assets/data/taskData';

const TasksScreen = ({ route }) => {
  const {
    score = 0,
    clicks = 0,
    doubleTaps = 0,
    longPress = 0,
    panned = false,
    flingRight = false,
    flingLeft = false,
    pinched = false,
  } = route.params || {};

  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const updatedTasks = tasks.map(task => {
      let completed = false;
      const value = route.params?.[task.condition]; 

      if (typeof value === 'boolean') {
        completed = value; 
      } else if (typeof value === 'number') {
        completed = value >= task.target; 
      }
      return { ...task, completed };
    });
    setTasks(updatedTasks);
  }, [score, clicks, doubleTaps, longPress, panned, flingRight, flingLeft, pinched, route.params, tasks]);

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Current Score: {score}</Text>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskItem title={item.title} completed={item.completed} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View/>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TasksScreen;