import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../shared/theme/colors';
import { styles } from '../styles/PromoBanner.styles';

interface PromoBannerProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
  onPress?: () => void;
}

function PromoBannerCard({
  title,
  subtitle,
  icon,
  backgroundColor,
  onPress,
}: PromoBannerProps) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color={colors.text.inverse} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.text.inverse}
        />
      </View>
    </TouchableOpacity>
  );
}

export default function PromoBanner() {
  const banners = [
    {
      id: '1',
      title: 'Invertí en Fondos',
      subtitle: 'Rendimiento del 30% anual',
      icon: 'trending-up' as const,
      backgroundColor: colors.primary,
    },
    {
      id: '2',
      title: 'Stop Loss Automático',
      subtitle: 'Protegé tus inversiones',
      icon: 'shield-checkmark' as const,
      backgroundColor: colors.positive,
    },
    {
      id: '3',
      title: '¿Te gustó esta App?',
      subtitle: 'Contratá al dev que la hizo (:',
      icon: 'person-add' as const,
      backgroundColor: colors.status.warning,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {banners.map(banner => (
          <PromoBannerCard
            key={banner.id}
            title={banner.title}
            subtitle={banner.subtitle}
            icon={banner.icon}
            backgroundColor={banner.backgroundColor}
          />
        ))}
      </ScrollView>
    </View>
  );
}
