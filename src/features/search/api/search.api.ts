import apiClient from "../../../shared/api/client";
import { API_ENDPOINTS } from "../../../shared/constants/api";
import { SearchResult } from "../../../shared/types/api.types";

export const searchInstruments = async (
  query: string,
  signal?: AbortSignal
): Promise<SearchResult[]> => {
  const response = await apiClient.get<SearchResult[]>(API_ENDPOINTS.SEARCH, {
    params: { q: query },
    signal,
  });
  return response.data;
};
