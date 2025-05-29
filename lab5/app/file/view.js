import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import * as FileSystem from "expo-file-system"
import { useLocalSearchParams, router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function FileViewScreen() {
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

  const handleEdit = () => {
    router.push({
      pathname: "/file/edit",
      params: {
        filePath,
        fileName,
      },
    })
  }

  return (
    <View >
      <View >
        <Text >{fileName}</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Ionicons name="create-outline" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {loading ? (
          <Text >Завантаження...</Text>
        ) : (
          <Text >{content}</Text>
        )}
      </ScrollView>
    </View>
  )
}
