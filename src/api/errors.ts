import { AxiosError } from 'axios';
import { HTTP_STATUS } from './constants/http';
import i18n from '../config/i18n';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const normalizeApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;

    // Handle network/timeout errors with friendly messages
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      return {
        message: i18n.t('api.timeout', { ns: 'errors' }),
        code: 'TIMEOUT_ERROR',
      };
    }

    if (error.code === 'NETWORK_ERROR' || !error.response) {
      return {
        message: i18n.t('api.network', { ns: 'errors' }),
        code: 'NETWORK_ERROR',
      };
    }

    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        return {
          message: i18n.t('api.badRequest', { ns: 'errors' }),
          status,
          code: 'BAD_REQUEST',
        };
      case HTTP_STATUS.UNAUTHORIZED:
        return {
          message: i18n.t('api.unauthorized', { ns: 'errors' }),
          status,
          code: 'UNAUTHORIZED',
        };
      case HTTP_STATUS.FORBIDDEN:
        return {
          message: i18n.t('api.forbidden', { ns: 'errors' }),
          status,
          code: 'FORBIDDEN',
        };
      case HTTP_STATUS.NOT_FOUND:
        return {
          message: i18n.t('api.notFound', { ns: 'errors' }),
          status,
          code: 'NOT_FOUND',
        };
      case HTTP_STATUS.TOO_MANY_REQUESTS:
        return {
          message: i18n.t('api.tooManyRequests', { ns: 'errors' }),
          status,
          code: 'TOO_MANY_REQUESTS',
        };
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return {
          message: i18n.t('api.serverError', { ns: 'errors' }),
          status,
          code: 'SERVER_ERROR',
        };
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        return {
          message: i18n.t('api.serviceUnavailable', { ns: 'errors' }),
          status,
          code: 'SERVICE_UNAVAILABLE',
        };
      default:
        return {
          message: i18n.t('api.generic', { ns: 'errors' }),
          status,
          code: 'NETWORK_ERROR',
        };
    }
  }

  if (error instanceof Error) {
    return {
      message: i18n.t('api.unknown', { ns: 'errors' }),
      code: 'UNKNOWN_ERROR',
    };
  }

  return {
    message: i18n.t('api.unknown', { ns: 'errors' }),
    code: 'UNKNOWN_ERROR',
  };
};
