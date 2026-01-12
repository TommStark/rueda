import { View, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { BalanceDataPoint } from "../../../shared/mocks/home.mock";
import { styles } from "../styles/BalanceChart.styles";

interface BalanceChartProps {
  data: BalanceDataPoint[];
}

const CHART_WIDTH = Dimensions.get("window").width - 64;
const CHART_HEIGHT = 120;
const PADDING = 20;

export default function BalanceChart({ data }: BalanceChartProps) {
  const values = data.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue;

  const points = data.map((point, index) => {
    const x =
      (index / (data.length - 1)) * (CHART_WIDTH - PADDING * 2) + PADDING;
    const y =
      CHART_HEIGHT -
      PADDING -
      ((point.value - minValue) / range) * (CHART_HEIGHT - PADDING * 2);
    return { x, y };
  });

  const pathData = points.reduce((acc, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }
    const prevPoint = points[index - 1];
    const controlX1 = prevPoint.x + (point.x - prevPoint.x) / 3;
    const controlY1 = prevPoint.y;
    const controlX2 = prevPoint.x + ((point.x - prevPoint.x) * 2) / 3;
    const controlY2 = point.y;
    return `${acc} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${point.x} ${point.y}`;
  }, "");

  const areaPath = `${pathData} L ${
    points[points.length - 1].x
  } ${CHART_HEIGHT} L ${PADDING} ${CHART_HEIGHT} Z`;

  return (
    <View style={styles.container}>
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#6200ee" stopOpacity="0.3" />
            <Stop offset="1" stopColor="#6200ee" stopOpacity="0.05" />
          </LinearGradient>
        </Defs>
        <Path d={areaPath} fill="url(#gradient)" />
        <Path d={pathData} stroke="#6200ee" strokeWidth="3" fill="none" />
        {points.map((point, index) => (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#6200ee"
            stroke="#fff"
            strokeWidth="2"
          />
        ))}
      </Svg>
      <View style={styles.labelsContainer}>
        {data.map((point, index) => (
          <Text key={index} variant="bodySmall" style={styles.label}>
            {point.day}
          </Text>
        ))}
      </View>
    </View>
  );
}
