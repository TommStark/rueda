import apiClient from '../../../api/client';
import { API_ENDPOINTS } from '../../../api/constants/api';
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
