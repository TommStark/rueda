import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { colors } from "../theme/colors";
import { styles } from "./styles/AppHeader.styles";

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
        require("../assets/sounds/bell.mp3")
      );
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      // Silently fail if sound file doesn't exist
    }
  };

  const handleNotificationPress = async () => {
    await playBellSound();
    onNotificationPress?.();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.avatar} onPress={onAvatarPress}>
        <Text style={styles.avatarText}>🙂</Text>
      </TouchableOpacity>
      <Text style={styles.screenName}>{screenName}</Text>
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={handleNotificationPress}
      >
        <Ionicons
          name="notifications-outline"
          size={24}
          color={colors.text.secondary}
        />
      </TouchableOpacity>
    </View>
  );
}
