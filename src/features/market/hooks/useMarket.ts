import { useQuery } from "@tanstack/react-query";
import { fetchMarketAssets } from "../api/market.api";
import { normalizeApiError } from "../../../shared/utils/errors";

export const MARKET_QUERY_KEY = ["market"] as const;

export const useMarket = (search: string = "") => {
  return useQuery({
    queryKey: [...MARKET_QUERY_KEY, search],
    queryFn: ({ signal }) => fetchMarketAssets({ search }, signal),
    select: (data) => data,
    meta: {
      errorMessage: "Error al cargar market",
    },
    throwOnError: false,
  });
};

export const useMarketError = (error: unknown) => {
  if (!error) return null;
  return normalizeApiError(error);
};
