import { View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TopMover } from "../../../shared/mocks/home.mock";
import { styles } from "../styles/TopMoverCard.styles";

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
