import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { SearchResult } from "../types/search.types";
import { styles } from "../styles/SearchResultCard.styles";

interface SearchResultCardProps {
  result: SearchResult;
}

export default function SearchResultCard({ result }: SearchResultCardProps) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.ticker}>
            {result.ticker}
          </Text>
          <Text variant="bodyMedium" style={styles.name}>
            {result.name}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}
