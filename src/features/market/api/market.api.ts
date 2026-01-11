import apiClient from "../../../shared/api/client";
import { API_ENDPOINTS } from "../../../shared/constants/api";
import { MarketAsset, AssetType } from "../../../shared/types/api.types";

export interface FetchMarketAssetsParams {
  type?: AssetType;
  search?: string;
}

export const fetchMarketAssets = async (
  params: FetchMarketAssetsParams = {},
  signal?: AbortSignal
): Promise<MarketAsset[]> => {
  const { type, search } = params;

  if (search && search.trim().length > 0) {
    const response = await apiClient.get<MarketAsset[]>(
      API_ENDPOINTS.MARKET_SEARCH,
      {
        params: { query: search.trim() },
        signal,
      }
    );
    return response.data;
  }

  const response = await apiClient.get<MarketAsset[]>(API_ENDPOINTS.MARKET, {
    signal,
  });

  let assets = response.data;

  if (type && type !== "ALL") {
    assets = assets.filter((asset) => asset.type === type);
  }

  return assets;
};
