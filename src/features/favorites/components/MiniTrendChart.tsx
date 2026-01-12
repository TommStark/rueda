import { View, StyleSheet } from "react-native";
import Svg, { Polyline } from "react-native-svg";
import { colors } from "../../../shared/theme/colors";

interface MiniTrendChartProps {
  isPositive: boolean;
}

export default function MiniTrendChart({ isPositive }: MiniTrendChartProps) {
  const width = 60;
  const height = 24;

  const points = isPositive
    ? "0,20 12,16 24,12 36,10 48,6 60,4"
    : "0,4 12,8 24,10 36,14 48,18 60,20";

  const strokeColor = isPositive ? colors.positive : colors.negative;

  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Polyline
          points={points}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 24,
  },
});
