import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import Tabs from '../components/Tabs';
import ChatItem from '../components/chatComponents/ChatItem';
import { useTheme } from '@react-navigation/native';
import getChatStyles from '../styles/chatStyles';
import sampleTabsStyles from '../styles/sampleTabsStyles';

export const CHATS = [
  {
    id: '1',
    name: 'GhostlyBlade_77',
    avatar: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?semt=ais_hybrid&w=740',
    message: `Ready for the raid in 5!`,
    date: 'Today',
    unread: true,
    online: true,
    you: false,
  },
  {
    id: '2',
    name: 'PhantomWhisper',
    avatar: 'https://img.freepik.com/premium-vector/animal-mascot-gaming-logo_257043-20193.jpg?semt=ais_hybrid&w=740', 
    message: 'Got it, heading to the lobby now.',
    date: 'Today',
    unread: false,
    online: true,
    you: true,
  },
  {
    id: '3',
    name: 'PixelPioneer',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxE6li-xSqC6mNA6wK6YWZw4q1UEGsYQ7RTw&s',
    message: 'Anyone for a quick match?',
    date: 'Yesterday',
    unread: false,
    online: false,
    you: false,
  },
  {
    id: '4',
    name: 'StarGazer_X',
    avatar: 'https://art.pixilart.com/44df38dcf8ec8ac.png',
    message: 'Logging off for tonight. GLHF!',
    date: 'Yesterday',
    unread: false,
    online: false,
    you: false,
  },
  {
    id: '5',
    name: 'DragonSlayer99',
    avatar: 'https://res.cloudinary.com/upwork-cloud/video/upload/c_scale,w_1000/v1633330561/catalog/1432577315898511360/nttbnmqk53nyp2gwteh2.JPEG', 
    message: 'Nice play last round!',
    date: '14 Jun',
    unread: false,
    online: true,
    you: false,
  },
  {
    id: '6',
    name: 'MysticMage',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQxLkxM74NpZJpVVda-9sXa5_vqtiap8g99Q&s',
    message: 'Thanks! You too.',
    date: '14 Jun',
    unread: false,
    online: false,
    you: true,
  },
  {
    id: '7',
    name: 'CyborgNinja_YT',
    avatar: 'https://images.steamusercontent.com/ugc/963101991851134801/CD74D52F492A735717DE3DBEBC79D82E7C902606/?imw=1024&imh=576&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true', 
    message: 'Check out my new video!',
    date: '13 Jun',
    unread: true,
    online: true,
    you: false,
  },
  {
    id: '8',
    name: 'LoreKeeper',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi1AdaOPoUm6QTTTpPZSgxn4huYio-fYsR0Q&s',
    message: 'Interesting...',
    date: '13 Jun',
    unread: false,
    online: false,
    you: false,
  },
  {
    id: '9',
    name: 'NeonDreamer',
    avatar: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs3/140155725/original/e0808761d8cbd7d82fa4570512e4438ce9a4a92e/draw-a-discord-avatar-for-you.png',
    message: 'Good luck with the new season!',
    date: '12 Jun',
    unread: false,
    online: false,
    you: true,
  },
  {
    id: '10',
    name: 'VoidWalker',
    avatar: 'https://wallpapers.com/images/hd/discord-profile-pictures-sfbi4olzfj2s5byh.jpg', 
    message: 'Thanks, you too. See ya online.',
    date: '12 Jun',
    unread: false,
    online: false,
    you: false,
  },
];

export const TABS = [
  { key: 'chats', label: 'Open chats' },
  { key: 'friends', label: 'My friends' },
];

const ChatScreen = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const { colors } = useTheme();
  const styles = getChatStyles(colors);
  const mainStyles = sampleTabsStyles(colors);

  return (
    <View style={styles.container}>
      <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} styles={mainStyles} />
      <FlatList
        data={CHATS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ChatItem item={item} styles={styles} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default ChatScreen;
