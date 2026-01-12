import { View } from "react-native";
import Skeleton from "../../../shared/components/Skeleton";
import { styles } from "../styles/OrderCardSkeleton.styles";

export default function OrderCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Skeleton width={80} height={16} />
          <Skeleton width={90} height={28} borderRadius={14} />
        </View>
        <View style={styles.details}>
          <Skeleton width="100%" height={14} style={{ marginBottom: 8 }} />
          <Skeleton width="100%" height={14} style={{ marginBottom: 8 }} />
          <Skeleton width="100%" height={14} />
        </View>
      </View>
    </View>
  );
}
