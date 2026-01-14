import { useQuery } from "@tanstack/react-query";
import { fetchMarketAssets } from "../api/market.api";
import { normalizeApiError } from "../../../shared/utils/errors";
import { useMemo } from "react";

export const MARKET_QUERY_KEY = ["market"] as const;

export const useMarket = (search: string = "") => {
  const allDataQuery = useQuery({
    queryKey: MARKET_QUERY_KEY,
    queryFn: ({ signal }) => fetchMarketAssets({}, signal),
    meta: {
      errorMessage: "Error al cargar market",
    },
    throwOnError: false,
  });

  const filteredData = useMemo(() => {
    if (!allDataQuery.data) return [];

    if (!search || search.trim().length === 0) {
      return allDataQuery.data;
    }

    const searchTerm = search.trim().toUpperCase();
    return allDataQuery.data.filter(
      (asset) =>
        asset.ticker.toUpperCase().includes(searchTerm) ||
        asset.name.toUpperCase().includes(searchTerm)
    );
  }, [allDataQuery.data, search]);

  return {
    ...allDataQuery,
    data: filteredData,
  };
};

export const useMarketError = (error: unknown) => {
  if (!error) return null;
  return normalizeApiError(error);
};
