import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { SearchResult } from "../../../shared/types/api.types";

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

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  content: {
    gap: 4,
  },
  ticker: {
    fontWeight: "bold",
  },
  name: {
    color: "#666",
  },
});
