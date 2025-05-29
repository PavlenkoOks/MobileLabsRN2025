import React, { useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import * as FileSystem from "expo-file-system"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function ExplorerScreen() {
  useEffect(() => {
    setupAppDirectory()
  }, [])

  const setupAppDirectory = async () => {
    const appDir = FileSystem.documentDirectory + "AppData"
    const dirInfo = await FileSystem.getInfoAsync(appDir)

    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(appDir, { intermediates: true })
      console.log("Created AppData directory")
    }
  }

  const openAppDirectory = () => {
    const encodedPath = encodeURIComponent(FileSystem.documentDirectory + "AppData")
    router.push(`/folder/${encodedPath}?name=AppData`)
  }

  return (
    <View>
      <View>
        <Ionicons name="folder-open" size={64} color="#2196F3" />
        <Text>Файловий менеджер</Text>
        <Text>
          Переглядайте та керуйте файлами вашого додатку
        </Text>

        <TouchableOpacity onPress={openAppDirectory}>
          <Ionicons name="folder" size={24} color="#fff" />
          <Text>Відкрити файловий менеджер</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
