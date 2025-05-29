import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  RefreshControl, 
} from "react-native";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";

import { formatBytes, getFileIcon, getFileType } from "../utils/fileHelper";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import styles from "../../assets/styles/styles";

export default function FolderScreen() {
  const { path: encodedPath } = useLocalSearchParams();
  const path = decodeURIComponent(encodedPath);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [fileContent, setFileContent] = useState("");

  const loadDirectory = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const content = await FileSystem.readDirectoryAsync(path);
      const detailedItems = await Promise.all(
        content.map(async (item) => {
          const itemPath = `${path}/${item}`;
          const info = await FileSystem.getInfoAsync(itemPath);
          return {
            name: item,
            path: itemPath,
            isDirectory: info.isDirectory,
            size: info.size || 0,
            modificationTime: info.modificationTime || Date.now(),
            uri: info.uri,
          };
        })
      );

      detailedItems.sort((a, b) => {
        if (a.isDirectory !== b.isDirectory) {
          return a.isDirectory ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });

      setItems(detailedItems);
    } catch (err) {
      Alert.alert("Помилка завантаження", "Не вдалося завантажити вміст папки.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [path]);

  useEffect(() => {
    loadDirectory();
  }, [path, loadDirectory]);

  const handlePress = useCallback((item) => {
    if (item.isDirectory) {
      router.push(`/folder/${encodeURIComponent(item.path)}?name=${item.name}`);
    } else if (item.name.endsWith(".txt")) {
      router.push({
        pathname: "/file/view",
        params: {
          filePath: item.path,
          fileName: item.name,
        },
      });
    } else {
      Alert.alert("Непідтримуваний формат", "Перегляд доступний лише для .txt файлів.");
    }
  }, []);

  const showOptions = useCallback((item) => {
    Alert.alert(item.name, "Оберіть дію", [
      {
        text: "Інформація",
        onPress: () =>
          router.push({
            pathname: "/file/info",
            params: {
              filePath: item.path,
              fileName: item.name,
              fileSize: item.size,
              fileModified: item.modificationTime,
              isDirectory: item.isDirectory ? "1" : "0",
            },
          }),
      },
      {
        text: item.isDirectory ? "Відкрити" : "Переглянути",
        onPress: () => handlePress(item),
      },
      !item.isDirectory && item.name.endsWith(".txt")
        ? {
            text: "Редагувати",
            onPress: () =>
              router.push({
                pathname: "/file/edit",
                params: {
                  filePath: item.path,
                  fileName: item.name,
                },
              }),
          }
        : null,
      {
        text: "Видалити",
        onPress: () => confirmDelete(item),
        style: "destructive",
      },
      {
        text: "Скасувати",
        style: "cancel",
      },
    ].filter(Boolean));
  }, [handlePress]);

  const confirmDelete = useCallback((item) => {
    Alert.alert(
      "Підтвердити видалення",
      `Ви впевнені, що хочете видалити "${item.name}"?`,
      [
        { text: "Скасувати", style: "cancel" },
        { text: "Видалити", onPress: () => deleteItem(item), style: "destructive" },
      ]
    );
  }, []);

  const deleteItem = useCallback(async (item) => {
    try {
      await FileSystem.deleteAsync(item.path, { idempotent: true });
      loadDirectory();
      Alert.alert("Успіх", `${item.name} успішно видалено.`);
    } catch (error) {
      console.error("Помилка видалення:", error);
      Alert.alert("Помилка видалення", `Не вдалося видалити "${item.name}".`);
    }
  }, [loadDirectory]);

  const openModal = useCallback((type) => {
    setItemType(type);
    setItemName("");
    setFileContent("");
    setModalVisible(true);
  }, []);

  const createItem = useCallback(async () => {
    if (!itemName.trim()) {
      Alert.alert("Помилка", "Будь ласка, введіть назву.");
      return;
    }

    try {
      const newPath = `${path}/${itemName}${itemType === "file" ? ".txt" : ""}`;
      const info = await FileSystem.getInfoAsync(newPath);

      if (info.exists) {
        Alert.alert("Помилка", "Елемент з такою назвою вже існує.");
        return;
      }

      if (itemType === "folder") {
        await FileSystem.makeDirectoryAsync(newPath);
      } else {
        await FileSystem.writeAsStringAsync(newPath, fileContent);
      }

      setModalVisible(false);
      loadDirectory();
      Alert.alert("Успіх", `${itemName} успішно створено.`);
    } catch (error) {
      console.error("Помилка створення:", error);
      Alert.alert("Помилка створення", "Не вдалося створити елемент.");
    }
  }, [itemName, itemType, path, fileContent, loadDirectory]);

  const goUp = useCallback(() => {
    const rootPath = FileSystem.documentDirectory + "AppData";
    if (path === rootPath) {
      router.back();
      return;
    }
    const parent = path.substring(0, path.lastIndexOf("/"));
    const parentName = parent.substring(parent.lastIndexOf("/") + 1);
    router.push(`/folder/${encodeURIComponent(parent)}?name=${parentName || "Root"}`);
  }, [path]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handlePress(item)}
      onLongPress={() => showOptions(item)}
    >
      <ThemedView style={styles.iconContainer}>
        <Ionicons
          name={item.isDirectory ? "folder" : getFileIcon(item.name)}
          size={26} 
          color={item.isDirectory ? "#FFD700" : styles.colors.primary} 
        />
      </ThemedView>
      <ThemedView style={styles.itemDetails}>
        <ThemedText type="body" style={styles.itemName}>
          {item.name}
        </ThemedText>
        <ThemedText type="body" style={styles.itemInfo}>
          {item.isDirectory ? "Папка" : getFileType(item.name)} • {formatBytes(item.size)}
        </ThemedText>
      </ThemedView>
      <TouchableOpacity style={styles.moreButton} onPress={() => showOptions(item)}>
        <Ionicons name="ellipsis-vertical" size={22} color={styles.colors.text.light} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.pathContainer}>
        <TouchableOpacity style={styles.upButton} onPress={goUp}>
          <Ionicons name="arrow-up" size={22} color={styles.colors.primary} />
          <ThemedText type="body" style={styles.upButtonText}>
            Вгору
          </ThemedText>
        </TouchableOpacity>
        <ThemedText type="body" style={styles.pathText} numberOfLines={1} ellipsizeMode="middle">
          {path.replace(FileSystem.documentDirectory, "")}
        </ThemedText>
      </ThemedView>

      {loading && !refreshing ? ( 
        <ThemedText style={styles.loadingText}>Завантаження...</ThemedText>
      ) : items.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <Ionicons name="folder-open" size={72} color={styles.colors.border} />
          <ThemedText type="body" style={styles.emptyText}>
            Ця папка порожня
          </ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.path}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={ 
            <RefreshControl refreshing={refreshing} onRefresh={loadDirectory} tintColor={styles.colors.primary} />
          }
        />
      )}

      <ThemedView style={styles.actionButtonsContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.folderButton]} onPress={() => openModal("folder")}>
          <Ionicons name="folder-outline" size={26} color={styles.colors.text.white} />
          <ThemedText type="body" style={styles.actionButtonText}>
            Нова папка
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.fileButton]} onPress={() => openModal("file")}>
          <Ionicons name="document-outline" size={26} color={styles.colors.text.white} />
          <ThemedText type="body" style={styles.actionButtonText}>
            Новий файл
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <Modal
        animationType="fade" 
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ThemedView style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            <ThemedText type="title" style={styles.modalTitle}>
              {itemType === "folder" ? "Створити папку" : "Створити файл"}
            </ThemedText>

            <ThemedText type="body" style={styles.inputLabel}>
              {itemType === "folder" ? "Назва папки:" : "Назва файлу:"}
            </ThemedText>
            <TextInput
              style={styles.textInput}
              value={itemName}
              onChangeText={setItemName}
              placeholder="Введіть назву"
              placeholderTextColor={styles.colors.text.light}
            />
            {itemType === "file" && (
              <>
                <ThemedText type="body" style={styles.inputLabel}>
                  Вміст файлу:
                </ThemedText>
                <TextInput
                  style={[styles.textInput, { height: 120, textAlignVertical: "top" }]}
                  value={fileContent}
                  onChangeText={setFileContent}
                  multiline
                  placeholder="Введіть вміст файлу..."
                  placeholderTextColor={styles.colors.text.light}
                />
              </>
            )}

            <TouchableOpacity style={styles.modalButton} onPress={createItem}>
              <ThemedText type="body" style={styles.modalButtonText}>
                Створити
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
              <ThemedText type="body" style={styles.modalCancelText}>
                Скасувати
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}