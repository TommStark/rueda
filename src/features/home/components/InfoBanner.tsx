import { View, Image } from "react-native";
import { styles } from "../styles/InfoBanner.styles";

interface InfoBannerProps {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
}

export default function InfoBanner({ onPress }: InfoBannerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../../shared/assets/images/banner_cataratas.png")}
          style={styles.image}
          resizeMode="none"
        />
      </View>
    </View>
  );
}
