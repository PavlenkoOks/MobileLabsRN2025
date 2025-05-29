import React, { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import * as FileSystem from "expo-file-system"
import { useLocalSearchParams, router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function FileEditScreen() {
  const { filePath, fileName } = useLocalSearchParams()
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFileContent()
  }, [filePath])

  const loadFileContent = async () => {
    try {
      setLoading(true)
      const fileContent = await FileSystem.readAsStringAsync(filePath)
      setContent(fileContent)
    } catch (error) {
      console.error("Error reading file:", error)
      Alert.alert("Помилка", "Не вдалося прочитати файл")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      await FileSystem.writeAsStringAsync(filePath, content)
      Alert.alert("Успіх", "Файл збережено", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ])
    } catch (error) {
      console.error("Error saving file:", error)
      Alert.alert("Помилка", "Не вдалося зберегти файл")
    }
  }

  return (
    <View >
      <View >
        <Text >{fileName}</Text>
        <TouchableOpacity  onPress={handleSave}>
          <Ionicons name="save-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text >Завантаження...</Text>
      ) : (
        <TextInput
          
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}
    </View>
  )
}
