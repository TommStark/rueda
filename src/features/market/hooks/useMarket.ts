import { useQuery } from "@tanstack/react-query";
import { fetchMarketAssets } from "../api/market.api";
import { normalizeApiError } from "../../../shared/utils/errors";
import { AssetType } from "../../../shared/types/api.types";

export const MARKET_QUERY_KEY = ["market"] as const;

export const useMarket = (type: AssetType = "ALL", search: string = "") => {
  return useQuery({
    queryKey: [...MARKET_QUERY_KEY, type, search],
    queryFn: ({ signal }) => fetchMarketAssets({ type, search }, signal),
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
