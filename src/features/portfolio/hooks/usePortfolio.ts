import { useQuery } from '@tanstack/react-query';
import { fetchPortfolio } from '../api/portfolio.api';
import { normalizeApiError } from '../../../shared/utils/errors';

export const PORTFOLIO_QUERY_KEY = ['portfolio'] as const;

export const usePortfolio = () => {
  return useQuery({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: ({ signal }) => fetchPortfolio(signal),
    select: data => data,
    meta: {
      errorMessage: 'Error al cargar portfolio',
    },
    throwOnError: false,
  });
};

export const usePortfolioError = (error: unknown) => {
  if (!error) return null;
  return normalizeApiError(error);
};
