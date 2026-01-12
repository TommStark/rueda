import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
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
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.avatar} onPress={onAvatarPress}>
        <Text style={styles.avatarText}>👤</Text>
      </TouchableOpacity>
      <Text style={styles.screenName}>{screenName}</Text>
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={onNotificationPress}
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
