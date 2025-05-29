import { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../assets/styles/style';
import CustomTextInput from './CustomTextInput';

export default function TaskInputForm({ onAddTask }) {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');

  const handleAdd = useCallback(() => {
    onAddTask(text, description, time);
    setText('');
    setDescription('');
    setTime('');
  }, [text, description, time, onAddTask]);

  return (
    <View style={styles.inputContainer}>
      <CustomTextInput
        placeholder="Введіть завдання"
        value={text}
        onChangeText={setText}
      />
      <CustomTextInput
        placeholder="Введіть опис завдання"
        value={description}
        onChangeText={setDescription}
        multiline
        style={styles.descriptionInput}
      />
      <CustomTextInput
        placeholder="Час нагадування (РРРР-ММ-ДД ГГ:ХХ)"
        value={time}
        onChangeText={setTime}
        keyboardType="datetime"
      />
      
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Додати Завдання</Text>
      </TouchableOpacity>
    </View>
  );
}