import { onbordingPaths } from '../../types/app';
import { pathExceptions } from '../../types/app';
import {
  eraseKaslKey,
  getCustomerKaslKey,
  getKaslKey,
  getOnboardingToken,
  getSessionToken,
} from '../localStorage';
import { ApiResponseBody, ApiResponseHeaders, StatusCodes } from './types';

const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';

export const prepHeaders = (params?: {
  useCustomerKey?: boolean;
  useSessionToken?: boolean;
  useOnboardingToken?: boolean;
}) => {
  const { useCustomerKey, useSessionToken, useOnboardingToken } = params ?? {};
  const headers: {
    Authorization: string | void;
    'kasl-key'?: string | void;
    domain?: string;
  } = {
    Authorization: getKaslKey() ?? '',
  };
  if (getKaslKey() !== undefined) {
    headers['kasl-key'] = getKaslKey() ?? '';
  }
  if (useCustomerKey && getCustomerKaslKey() !== undefined) {
    headers['kasl-key'] = getCustomerKaslKey() ?? '';
  }
  if (useSessionToken && getSessionToken() !== undefined) {
    headers['kasl-key'] = getSessionToken() ?? '';
  }
  if (useOnboardingToken && getOnboardingToken() !== undefined) {
    headers['kasl-key'] = getOnboardingToken() ?? '';
  }
  if (is_public) {
    headers['domain'] = window.location.host;
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
  if (
    status === StatusCodes.E_FORBIDDEN ||
    status === StatusCodes.E_UNAUTHORIZED
  ) {
    eraseKaslKey();

    if (
      ![...pathExceptions, ...onbordingPaths].includes(window.location.pathname)
    ) {
      if (is_admin) {
        location.href = '/sign-in';
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
