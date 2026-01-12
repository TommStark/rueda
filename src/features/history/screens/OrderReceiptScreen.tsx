import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";
import OrderReceipt from "../../../shared/components/OrderReceipt";

type OrderReceiptRouteProp = RouteProp<RootStackParamList, "OrderReceipt">;

export default function OrderReceiptScreen() {
  const route = useRoute<OrderReceiptRouteProp>();
  const { order } = route.params;

  return <OrderReceipt order={order} />;
}
