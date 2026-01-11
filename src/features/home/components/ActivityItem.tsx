import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RecentActivity } from "../../../shared/mocks/home.mock";

interface ActivityItemProps {
  activity: RecentActivity;
}

export default function ActivityItem({ activity }: ActivityItemProps) {
  const isPositive = activity.amount > 0;

  const getIconBackgroundColor = () => {
    switch (activity.type) {
      case "buy":
        return "#e8eaf6";
      case "sell":
        return "#fff3e0";
      case "deposit":
        return "#e8f5e9";
      case "withdraw":
        return "#ffebee";
      default:
        return "#f5f5f5";
    }
  };

  const getIconColor = () => {
    switch (activity.type) {
      case "buy":
        return "#5e35b1";
      case "sell":
        return "#f57c00";
      case "deposit":
        return "#43a047";
      case "withdraw":
        return "#e53935";
      default:
        return "#666";
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: getIconBackgroundColor() },
        ]}
      >
        <MaterialCommunityIcons
          name={activity.icon as any}
          size={24}
          color={getIconColor()}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text variant="bodyMedium" style={styles.title}>
          {activity.title}
        </Text>
        <Text variant="bodySmall" style={styles.subtitle}>
          {activity.subtitle}
        </Text>
      </View>
      <Text
        variant="titleSmall"
        style={[styles.amount, isPositive ? styles.positive : styles.negative]}
      >
        {isPositive ? "+" : ""}${Math.abs(activity.amount).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  subtitle: {
    color: "#999",
    fontSize: 12,
  },
  amount: {
    fontWeight: "bold",
  },
  positive: {
    color: "#4caf50",
  },
  negative: {
    color: "#333",
  },
});
