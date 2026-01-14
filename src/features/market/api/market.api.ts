import apiClient from "../../../shared/api/client";
import { API_ENDPOINTS } from "../../../shared/constants/api";
import { MarketAsset } from "../types/market.types";

export interface FetchMarketAssetsParams {
  search?: string;
}

export const fetchMarketAssets = async (
  params: FetchMarketAssetsParams = {},
  signal?: AbortSignal
): Promise<MarketAsset[]> => {
  const { search } = params;

  if (search && search.trim().length > 0) {
    const response = await apiClient.get<MarketAsset[]>(
      API_ENDPOINTS.MARKET_SEARCH,
      {
        params: { query: search.trim().toUpperCase() },
        signal,
      }
    );
    return response.data;
  }

  const response = await apiClient.get<MarketAsset[]>(API_ENDPOINTS.MARKET, {
    signal,
  });

  return response.data;
};
