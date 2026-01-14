import apiClient from '../../../shared/api/client';
import { API_ENDPOINTS } from '../../../shared/constants/api';
import { PortfolioPosition } from '../types/portfolio.types';

export const fetchPortfolio = async (
  signal?: AbortSignal
): Promise<PortfolioPosition[]> => {
  const response = await apiClient.get<PortfolioPosition[]>(
    API_ENDPOINTS.PORTFOLIO,
    { signal }
  );
  return response.data;
};
