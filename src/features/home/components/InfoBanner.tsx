import { View, Image } from 'react-native';
import { styles } from '../styles/InfoBanner.styles';

export default function InfoBanner() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../../../shared/assets/images/banner_cataratas.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
}
