import { useQuery } from "@tanstack/react-query";
import { searchInstruments } from "../api/search.api";
import { normalizeApiError } from "../../../shared/utils/errors";

export const SEARCH_QUERY_KEY = ["search"] as const;

export const useSearch = (query: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [...SEARCH_QUERY_KEY, query],
    queryFn: ({ signal }) => searchInstruments(query, signal),
    enabled: enabled && query.length > 0,
    select: (data) => data,
    meta: {
      errorMessage: "Error al buscar instrumentos",
    },
    throwOnError: false,
  });
};

export const useSearchError = (error: unknown) => {
  if (!error) return null;
  return normalizeApiError(error);
};
