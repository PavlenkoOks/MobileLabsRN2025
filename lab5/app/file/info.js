import React from "react"
import { View, Text } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { formatBytes, formatDate } from "../utils/fileHelper"

export default function FileInfoScreen() {
  const { fileName, fileSize, fileModified, isDirectory } = useLocalSearchParams()

  return (
    <View >
      <View >
        <View >
          <Text >Назва:</Text>
          <Text >{fileName}</Text>
        </View>

        <View >
          <Text >Тип:</Text>
          <Text >{isDirectory === "1" ? "Папка" : "Файл"}</Text>
        </View>

        {isDirectory !== "1" && (
          <View >
            <Text >Розмір:</Text>
            <Text >{formatBytes(parseInt(fileSize))}</Text>
          </View>
        )}

        <View >
          <Text >Остання зміна:</Text>
          <Text >{formatDate(parseInt(fileModified))}</Text>
        </View>
      </View>
    </View>
  )
}
