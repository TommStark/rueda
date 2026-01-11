import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TopMover } from "../../../shared/mocks/home.mock";

interface TopMoverCardProps {
  mover: TopMover;
}

export default function TopMoverCard({ mover }: TopMoverCardProps) {
  const isPositive = mover.changePercentage >= 0;
  const iconColor = (mover as any).color?.icon || "#6200ee";
  const backgroundColor = (mover as any).color?.background || "#f0e6ff";

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor }]}>
        <MaterialCommunityIcons
          name={mover.icon as any}
          size={24}
          color={iconColor}
        />
      </View>
      <Text variant="labelLarge" style={styles.ticker}>
        {mover.ticker}
      </Text>
      <Text variant="bodySmall" style={styles.name} numberOfLines={1}>
        {mover.name}
      </Text>
      <Text variant="titleMedium" style={styles.price}>
        ${mover.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </Text>
      <View style={styles.changeContainer}>
        <MaterialCommunityIcons
          name={isPositive ? "trending-up" : "trending-down"}
          size={14}
          color={isPositive ? "#4caf50" : "#f44336"}
        />
        <Text
          variant="bodySmall"
          style={[
            styles.change,
            isPositive ? styles.positive : styles.negative,
          ]}
        >
          {isPositive ? "+" : ""}
          {mover.changePercentage.toFixed(1)}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    alignItems: "center",
    gap: 6,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  ticker: {
    fontWeight: "bold",
    color: "#333",
  },
  name: {
    fontSize: 10,
    color: "#999",
    textAlign: "center",
  },
  price: {
    fontWeight: "600",
    marginTop: 4,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  change: {
    fontSize: 11,
    fontWeight: "600",
  },
  positive: {
    color: "#4caf50",
  },
  negative: {
    color: "#f44336",
  },
});
