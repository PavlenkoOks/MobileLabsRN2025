import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from "../components/Footer"; // Переконайтеся, що шлях до Footer правильний

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.profileName}>Павленко</Text>
      <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
    backgroundColor: '#F8F8F8', 
    paddingBottom: 60, 
  },
  profileName: {
    fontSize: 24,         
    fontWeight: 'bold',    
    color: '#333333',       
    marginBottom: 20,       
  },
});