import { View, Image, ImageSourcePropType } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../shared/theme/colors";
import { TopMover } from "../../../shared/mocks/home.mock";
import { styles } from "../styles/TopMoverCard.styles";

interface TopMoverCardProps {
  mover: TopMover;
}

export default function TopMoverCard({ mover }: TopMoverCardProps) {
  const isPositive = mover.changePercentage >= 0;
  const tickerIcon = (mover as any).tickerIcon as ImageSourcePropType | null;
  const hasIcon = (mover as any).hasTickerIcon as boolean;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {hasIcon && tickerIcon ? (
          <Image source={tickerIcon} style={styles.iconImage} />
        ) : (
          <Text style={styles.iconText}>
            {mover.ticker.substring(0, 2).toUpperCase()}
          </Text>
        )}
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
          color={isPositive ? colors.positive : colors.negative}
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
