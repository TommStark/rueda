import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  card: {
    width: 280,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
  },
});
