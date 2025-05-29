import React, { useState } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import getCommunityStyles from '../styles/communityStyles';
import NewsCard from '../components/communityComponents/NewsCard';
import Tabs from '../components/Tabs';
import getTabsStyles from '../styles/tabsStyles';
import {NEWS} from '../data/mockNews';
import {TABS} from '../data/communityTabs';



const CommunityScreen = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');

  const { colors } = useTheme();
  const styles = getCommunityStyles(colors);
  const tabsStyles = getTabsStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>Спільнота - ділись контентом з іншими користувачами</Text>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Пошук"
          placeholderTextColor="#b0b8d1"
          value={search}
          onChangeText={setSearch}
        />
        <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} styles={tabsStyles} />
      </View>
      <FlatList
        data={NEWS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <NewsCard item={item} styles={styles} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};


export default CommunityScreen;
