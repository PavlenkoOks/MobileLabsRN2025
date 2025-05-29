import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { styles } from './assets/styles/style';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do Reminder</Text>
      <StatusBar style="auto" />
    </View>
  );
}
