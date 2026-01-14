import { AxiosError } from 'axios';
import { HTTP_STATUS } from '../../api/constants/http';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const normalizeApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        return { message: 'Solicitud inválida', status, code: 'BAD_REQUEST' };
      case HTTP_STATUS.UNAUTHORIZED:
        return { message: 'No autorizado', status, code: 'UNAUTHORIZED' };
      case HTTP_STATUS.FORBIDDEN:
        return { message: 'Acceso prohibido', status, code: 'FORBIDDEN' };
      case HTTP_STATUS.NOT_FOUND:
        return { message: 'Recurso no encontrado', status, code: 'NOT_FOUND' };
      case HTTP_STATUS.TOO_MANY_REQUESTS:
        return {
          message: 'Demasiadas solicitudes, intenta más tarde',
          status,
          code: 'TOO_MANY_REQUESTS',
        };
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return { message: 'Error del servidor', status, code: 'SERVER_ERROR' };
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        return {
          message: 'Servicio no disponible',
          status,
          code: 'SERVICE_UNAVAILABLE',
        };
      default:
        return {
          message: message || 'Error de conexión',
          status,
          code: 'NETWORK_ERROR',
        };
    }
  }

  if (error instanceof Error) {
    return { message: error.message, code: 'UNKNOWN_ERROR' };
  }

  return { message: 'Error desconocido', code: 'UNKNOWN_ERROR' };
};
