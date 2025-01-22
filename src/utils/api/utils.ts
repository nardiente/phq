import {
  eraseKaslKey,
  getCustomerKaslKey,
  getKaslKey,
  getSessionToken,
} from '../localStorage';
import { ApiResponseBody, ApiResponseHeaders, StatusCodes } from './types';

export const prepHeaders = (params?: {
  useCustomerKey?: boolean;
  useSessionToken?: boolean;
}) => {
  const { useCustomerKey, useSessionToken } = params ?? {};
  const headers: { Authorization: string | void; 'kasl-key'?: string | void } =
    {
      Authorization: getKaslKey() ?? '',
    };
  if (getKaslKey() !== null) {
    headers['kasl-key'] = getKaslKey() ?? '';
  }
  if (useCustomerKey && getCustomerKaslKey() !== null) {
    headers['kasl-key'] = getCustomerKaslKey() ?? '';
  }
  if (useSessionToken && getSessionToken() !== null) {
    headers['kasl-key'] = getSessionToken() ?? '';
  }
  return headers;
};

export const parseResponse = <Data = object>(response: any) => {
  const results: ApiResponseBody<Data> = {};
  const headers: ApiResponseHeaders = response.headers;
  results.records = response.data.records;
  results.record = response.data.record;
  results.data = response.data.data;
  results.message = response.data.message;
  // Response contains other data based on session
  // and relation
  const { data: more } = response.data;

  // Request had valid kasl-key header
  if (more && more.user) {
    results.user = more.user;
  }

  return {
    results,
    headers,
  };
};

export const processErrors = (api_error: any) => {
  const { data, headers: response_headers, status } = api_error.response;
  const { error, errors, message } = data;
  const headers = {
    ...response_headers,
    status,
  };

  const is_admin = import.meta.env.VITE_SYSTEM_TYPE === 'admin';
  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';
  if (
    status === StatusCodes.E_FORBIDDEN ||
    status === StatusCodes.E_UNAUTHORIZED
  ) {
    eraseKaslKey();
    const onbordingPaths = [
      '/ob-board',
      '/ob-idea',
      '/ob-tags',
      '/ob-survey',
      '/ob-success',
    ];
    const excludedPaths = [
      '/forgot-password',
      '/pricing',
      '/reset-password',
      '/sign-in',
      '/sign-in/google',
      '/sign-up',
    ];
    if (
      ![...excludedPaths, ...onbordingPaths].includes(window.location.pathname)
    ) {
      if (is_admin) {
        location.href = '/sign-in';
      }
      if (is_public) {
        // location.href = '/'
      }
    }
  }

  return {
    headers,
    results: {
      error,
      errors,
      message,
    },
  };
};
