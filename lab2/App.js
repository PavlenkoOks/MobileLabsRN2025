import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoreScreen from './screens/StoreScreen';
import CommunityScreen from './screens/CommunityScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useThemeContext } from './ThemeContext';

const Tab = createBottomTabNavigator();

function MainApp() {
  const { theme } = useThemeContext();

  return (
    <NavigationContainer theme={theme}>
      <StatusBar style={theme.dark ? 'light' : 'dark'} backgroundColor={theme.colors.card} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Магазин') iconName = 'bag';
            if (route.name === 'Спільнота') iconName = 'people';
            if (route.name === 'Профіль') iconName = 'man';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text + '99',
          tabBarStyle: {
            backgroundColor: theme.colors.card,
            borderTopColor: theme.colors.border,
          },
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.text,
          },
        })}
      >
        <Tab.Screen name="Магазин" component={StoreScreen} />
        <Tab.Screen name="Спільнота" component={CommunityScreen} />
        <Tab.Screen name="Профіль" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
