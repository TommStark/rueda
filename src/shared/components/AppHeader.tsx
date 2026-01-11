import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

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
        <Ionicons name="notifications-outline" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fafafa",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffe4d6",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 20,
  },
  screenName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1a1a1a",
    letterSpacing: -0.3,
  },
  notificationButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
