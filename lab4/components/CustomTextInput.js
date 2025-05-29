import React from 'react';
import { TextInput } from 'react-native';
import { styles } from '../assets/styles/style';

const CustomTextInput = ({ placeholder, value, onChangeText, multiline = false, style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, multiline && styles.descriptionInput, style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      {...props}
    />
  );
};

export default CustomTextInput;