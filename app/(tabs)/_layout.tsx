import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from '../../src/shared/hooks/useTranslation';
import { colors } from '../../src/theme/colors';

const styles = StyleSheet.create({
  centralButtonContainer: {
    position: 'absolute',
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centralButtonOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryLightAlpha,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centralButton: {
    width: 48,
    height: 48,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function TabsLayout() {
  const { t } = useTranslation('navigation');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.tertiary,
        headerShown: false,
        tabBarStyle: {
          height: 73,
          paddingBottom: 30,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: t('tabs.market'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chart-line-variant"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: t('tabs.favorites'),
          tabBarIcon: () => (
            <View style={styles.centralButtonContainer}>
              <View style={styles.centralButtonOuter}>
                <View style={styles.centralButton}>
                  <MaterialCommunityIcons
                    name="star"
                    size={28}
                    color={colors.text.inverse}
                  />
                </View>
              </View>
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: t('tabs.portfolio'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="briefcase-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t('tabs.history'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
