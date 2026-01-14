import { ImageSourcePropType } from 'react-native';

export interface RecentActivity {
  id: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdraw';
  ticker?: string;
  amount: number;
  date: string;
  icon: string;
  title: string;
  subtitle: string;
}

export interface TopMover {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercentage: number;
  icon: string;
  tickerIcon?: ImageSourcePropType | null;
  hasTickerIcon?: boolean;
}
