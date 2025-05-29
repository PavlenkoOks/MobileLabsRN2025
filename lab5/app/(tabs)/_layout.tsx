import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: '#2196F3' }}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Головна',
					tabBarIcon: ({ color }) => (
						<Ionicons name="home" size={24} color={color} />
					),
				}}
			/>
			
		</Tabs>
	);
}
