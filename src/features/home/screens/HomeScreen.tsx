import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import QuickActionButton from "../components/QuickActionButton";
import TopMoverCard from "../components/TopMoverCard";
import ActivityItem from "../components/ActivityItem";
import BalanceChart from "../components/BalanceChart";
import {
  MOCK_USER_NAME,
  MOCK_TOTAL_BALANCE,
  MOCK_BALANCE_CHANGE_PERCENTAGE,
  MOCK_WEEKLY_BALANCE,
  MOCK_TOP_MOVERS,
  MOCK_RECENT_ACTIVITY,
} from "../../../shared/mocks/home.mock";

export default function HomeScreen() {
  const isPositiveChange = MOCK_BALANCE_CHANGE_PERCENTAGE >= 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Good morning";
    } else if (hour >= 12 && hour < 19) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const handleDeposit = () => {
    console.log("Navigate to Deposit");
  };

  const handleWithdraw = () => {
    console.log("Navigate to Withdraw");
  };

  const handleTransfer = () => {
    console.log("Navigate to Transfer");
  };

  const handleScanQR = () => {
    console.log("Navigate to Scan QR");
  };

  const handleViewAllActivity = () => {
    console.log("Navigate to All Activity");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons
              name="account-circle"
              size={48}
              color="#e0e0e0"
            />
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="bell-outline"
              size={24}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.greetingSection}>
          <Text variant="headlineMedium" style={styles.greeting}>
            {getGreeting()}, {MOCK_USER_NAME}
          </Text>
          <Text variant="bodySmall" style={styles.subGreeting}>
            Welcome back to RUEDA
          </Text>
        </View>

        <View style={styles.balanceCard}>
          <Text variant="bodySmall" style={styles.balanceLabel}>
            Total Balance
          </Text>
          <View style={styles.balanceRow}>
            <Text variant="headlineLarge" style={styles.balanceAmount}>
              $
              {MOCK_TOTAL_BALANCE.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </Text>
            <View
              style={[
                styles.changeChip,
                isPositiveChange
                  ? styles.changeChipPositive
                  : styles.changeChipNegative,
              ]}
            >
              <MaterialCommunityIcons
                name={isPositiveChange ? "trending-up" : "trending-down"}
                size={14}
                color={isPositiveChange ? "#4caf50" : "#f44336"}
              />
              <Text
                variant="bodySmall"
                style={[
                  styles.changeText,
                  isPositiveChange
                    ? styles.changeTextPositive
                    : styles.changeTextNegative,
                ]}
              >
                {isPositiveChange ? "+" : ""}
                {MOCK_BALANCE_CHANGE_PERCENTAGE}%
              </Text>
            </View>
          </View>
          <BalanceChart data={MOCK_WEEKLY_BALANCE} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Quick Actions
            </Text>
          </View>
          <View style={styles.quickActionsGrid}>
            <QuickActionButton
              icon="plus"
              label="Deposit"
              onPress={handleDeposit}
              variant="primary"
            />
            <QuickActionButton
              icon="arrow-down"
              label="Withdraw"
              onPress={handleWithdraw}
            />
            <QuickActionButton
              icon="swap-horizontal"
              label="Transfer"
              onPress={handleTransfer}
            />
            <QuickActionButton
              icon="qrcode-scan"
              label="Scan QR"
              onPress={handleScanQR}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Top Movers
            </Text>
            <TouchableOpacity>
              <Text variant="bodySmall" style={styles.seeAllButton}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topMoversContainer}
          >
            {MOCK_TOP_MOVERS.map((mover) => (
              <TopMoverCard key={mover.ticker} mover={mover} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Recent Activity
            </Text>
            <TouchableOpacity onPress={handleViewAllActivity}>
              <Text variant="bodySmall" style={styles.seeAllButton}>
                View History
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityContainer}>
            {MOCK_RECENT_ACTIVITY.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  greetingSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subGreeting: {
    color: "#999",
  },
  balanceCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceLabel: {
    color: "#999",
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  balanceAmount: {
    fontWeight: "bold",
    color: "#333",
  },
  changeChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  changeChipPositive: {
    backgroundColor: "#e8f5e9",
  },
  changeChipNegative: {
    backgroundColor: "#ffebee",
  },
  changeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  changeTextPositive: {
    color: "#4caf50",
  },
  changeTextNegative: {
    color: "#f44336",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#333",
  },
  seeAllButton: {
    color: "#6200ee",
    fontWeight: "600",
  },
  quickActionsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  topMoversContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  activityContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
});
