export interface BalanceDataPoint {
  day: string;
  value: number;
}

export interface TopMover {
  ticker: string;
  name: string;
  price: number;
  changePercentage: number;
  icon: string;
}

export interface RecentActivity {
  id: string;
  type: "buy" | "sell" | "deposit" | "withdraw";
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  icon: string;
}

export const MOCK_USER_NAME = "Alex";

export const MOCK_TOTAL_BALANCE = 24592.4;

export const MOCK_BALANCE_CHANGE_PERCENTAGE = 5.2;

export const MOCK_WEEKLY_BALANCE: BalanceDataPoint[] = [
  { day: "Mon", value: 23100 },
  { day: "Tue", value: 23400 },
  { day: "Wed", value: 23200 },
  { day: "Thu", value: 23800 },
  { day: "Fri", value: 24200 },
  { day: "Sat", value: 24400 },
  { day: "Sun", value: 24592.4 },
];

export interface TopMoverColor {
  icon: string;
  background: string;
}

export const MOCK_TOP_MOVERS: (TopMover & { color: TopMoverColor })[] = [
  {
    ticker: "TSLA",
    name: "Tesla Inc.",
    price: 242.5,
    changePercentage: 4.2,
    icon: "car-electric",
    color: {
      icon: "#e82127",
      background: "#ffebee",
    },
  },
  {
    ticker: "BTC",
    name: "Bitcoin",
    price: 66400,
    changePercentage: -1.8,
    icon: "bitcoin",
    color: {
      icon: "#f7931a",
      background: "#fff3e0",
    },
  },
  {
    ticker: "NVDA",
    name: "Nvidia",
    price: 892.1,
    changePercentage: 6.5,
    icon: "chip",
    color: {
      icon: "#76b900",
      background: "#e8f5e9",
    },
  },
];

export const MOCK_RECENT_ACTIVITY: RecentActivity[] = [
  {
    id: "1",
    type: "buy",
    title: "Apple Inc.",
    subtitle: "Oct 3, 8:32 AM",
    amount: -150.0,
    date: "2024-10-03T08:32:00",
    icon: "apple",
  },
  {
    id: "2",
    type: "deposit",
    title: "USD Deposit",
    subtitle: "Credit Card",
    amount: 5000.0,
    date: "2024-10-02T14:20:00",
    icon: "credit-card",
  },
  {
    id: "3",
    type: "sell",
    title: "Tesla Inc.",
    subtitle: "Oct 1, 3:15 PM",
    amount: 320.5,
    date: "2024-10-01T15:15:00",
    icon: "car-electric",
  },
  {
    id: "4",
    type: "buy",
    title: "Microsoft Corp.",
    subtitle: "Sep 30, 11:45 AM",
    amount: -280.0,
    date: "2024-09-30T11:45:00",
    icon: "microsoft",
  },
];
