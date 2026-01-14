import { ImageSourcePropType } from 'react-native';

const TICKER_ICONS: Record<string, ImageSourcePropType> = {
  ars: require('../../assets/icons/ars.png'),
  bbar: require('../../assets/icons/bbar.png'),
  bpat: require('../../assets/icons/bpat.png'),
  capx: require('../../assets/icons/capx.png'),
  ceco2: require('../../assets/icons/ceco2.png'),
  celu: require('../../assets/icons/celu.png'),
  cvh: require('../../assets/icons/cvh.png'),
  dome: require('../../assets/icons/dome.png'),
  dyca: require('../../assets/icons/dyca.png'),
  ferr: require('../../assets/icons/ferr.png'),
  fipl: require('../../assets/icons/fipl.png'),
  gami: require('../../assets/icons/gami.png'),
  garo: require('../../assets/icons/garo.png'),
  harg: require('../../assets/icons/harg.png'),
  intr: require('../../assets/icons/intr.png'),
  ircp: require('../../assets/icons/ircp.png'),
  lede: require('../../assets/icons/lede.png'),
  mirg: require('../../assets/icons/mirg.png'),
  mola: require('../../assets/icons/mola.png'),
  mtr: require('../../assets/icons/mtr.png'),
  pata: require('../../assets/icons/pata.png'),
  pgr: require('../../assets/icons/pgr.png'),
  rigo: require('../../assets/icons/rigo.png'),
  sami: require('../../assets/icons/sami.png'),
  semi: require('../../assets/icons/semi.png'),
  teco2: require('../../assets/icons/teco2.png'),
};

export function getTickerIcon(ticker: string): ImageSourcePropType | null {
  const normalizedTicker = ticker.toLowerCase().trim();
  return TICKER_ICONS[normalizedTicker] || null;
}

export function hasTickerIcon(ticker: string): boolean {
  const normalizedTicker = ticker.toLowerCase().trim();
  return normalizedTicker in TICKER_ICONS;
}
