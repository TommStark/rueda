import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
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
  const handleNotificationPress = () => {
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
