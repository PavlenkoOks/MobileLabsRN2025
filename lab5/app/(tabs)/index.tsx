import { ScrollView } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { formatBytes, formatDate } from '../utils/fileHelper';

export default function HomeScreen() {
	const [storageInfo, setStorageInfo] = useState({
		totalSpace: 0,
		freeSpace: 0,
		usedSpace: 0,
	});

	useEffect(() => {
		fetchStorageInfo();
	}, []);

	const fetchStorageInfo = async () => {
		try {
			const freeSpace = await FileSystem.getFreeDiskStorageAsync();
			const totalSpace = 64 * 1024 * 1024 * 1024;
			const usedSpace = totalSpace - freeSpace;

			setStorageInfo({
				totalSpace,
				freeSpace,
				usedSpace,
			});
		} catch (error) {
			console.error('Error fetching storage info:', error);
		}
	};

	return (
		<ScrollView >
			<ThemedView >
				<ThemedText type="title">Павленко Оксана ІПЗ-21-5 Файловий менеджер</ThemedText>

				<ThemedView >
					<ThemedText type="title">Інформація про сховище</ThemedText>
					
					<ThemedView >
						<ThemedText type="body">Загальний обсяг:</ThemedText>
						<ThemedText type="body" style={{ fontWeight: '500' }}>{formatBytes(storageInfo.totalSpace)}</ThemedText>
					</ThemedView>

					<ThemedView >
						<ThemedText type="body">Вільний простір:</ThemedText>
						<ThemedText type="body" style={{ fontWeight: '500' }}>{formatBytes(storageInfo.freeSpace)}</ThemedText>
					</ThemedView>

					<ThemedView >
						<ThemedText type="body">Зайнятий простір:</ThemedText>
						<ThemedText type="body" style={{ fontWeight: '500' }}>{formatBytes(storageInfo.usedSpace)}</ThemedText>
					</ThemedView>

					<ThemedView>
						<ThemedView 
							style={[
								{ width: `${(storageInfo.usedSpace / storageInfo.totalSpace) * 100}%` }
							]} 
						/>
					</ThemedView>

					<ThemedText type="body" style={{ fontSize: 12, opacity: 0.5, textAlign: 'center', marginTop: 15 }}>
						Останнє оновлення: {formatDate(new Date())}
					</ThemedText>
				</ThemedView>
			</ThemedView>
		</ScrollView>
	);
}
