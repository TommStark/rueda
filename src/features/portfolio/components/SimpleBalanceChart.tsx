import { View } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { colors } from '../../../theme/colors';

interface SimpleBalanceChartProps {
  width?: number;
  height?: number;
}

export default function SimpleBalanceChart({
  width = 300,
  height = 80,
}: SimpleBalanceChartProps) {
  const points = [
    { x: 0, y: 55 },
    { x: 40, y: 50 },
    { x: 80, y: 60 },
    { x: 120, y: 45 },
    { x: 160, y: 52 },
    { x: 200, y: 35 },
    { x: 240, y: 42 },
    { x: 280, y: 30 },
    { x: 300, y: 25 },
  ];

  const createSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return '';

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const controlX = (current.x + next.x) / 2;

      path += ` Q ${controlX} ${current.y}, ${controlX} ${
        (current.y + next.y) / 2
      }`;
      path += ` Q ${controlX} ${next.y}, ${next.x} ${next.y}`;
    }

    return path;
  };

  const linePath = createSmoothPath(points);

  return (
    <View style={{ width, height, marginTop: 16 }}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={colors.primary} stopOpacity="0.3" />
            <Stop offset="1" stopColor={colors.primary} stopOpacity="0.8" />
          </LinearGradient>
        </Defs>
        <Path
          d={linePath}
          stroke="url(#lineGradient)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}
