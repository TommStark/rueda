import { View } from "react-native";
import Skeleton from "../../../shared/components/Skeleton";
import { styles } from "../styles/SearchResultSkeleton.styles";

export default function SearchResultSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Skeleton width={80} height={18} style={{ marginBottom: 8 }} />
        <Skeleton width={150} height={14} />
      </View>
    </View>
  );
}
