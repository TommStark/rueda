import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { colors } from '../theme/colors';
import { styles } from './styles/AppHeader.styles';

interface AppHeaderProps {
  screenName: string;
  onNotificationPress?: () => void;
  onAvatarPress?: () => void;
}

export default function AppHeader({
  screenName,
  onNotificationPress,
  onAvatarPress,
}: AppHeaderProps) {
  const playBellSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/bell.mp3')
      );
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch {
      // Silently fail if audio cannot be played
    }
  };

  const handleNotificationPress = async () => {
    await playBellSound();
    onNotificationPress?.();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.avatar} onPress={onAvatarPress}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.avatarImage}
        />
      </TouchableOpacity>
      <Text style={styles.screenName}>{screenName}</Text>
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={handleNotificationPress}
      >
        <Ionicons
          name="notifications-outline"
          size={20}
          color={colors.text.inverse}
        />
      </TouchableOpacity>
    </View>
  );
}
