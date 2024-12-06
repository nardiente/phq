import Axios, { AxiosHeaders } from 'axios';
import {
  ApiResponseBody,
  ApiResponseHeaders,
  Payload,
  QueryStringParams,
} from './types';
import { parseResponse, prepHeaders, processErrors } from './utils';
import { Moderation } from '../../types/moderation';

export const api_url = import.meta.env.VITE_API_HOST;
export const api_public_url = import.meta.env.VITE_API_HOST_PUBLIC;

export const getApi = async <Data = any>(
  url: string,
  params?: QueryStringParams,
  useSessionToken?: boolean,
  useCustomerKey?: boolean
) => {
  const qs_filters = new URLSearchParams(params);
  const query_string = qs_filters ? `?${qs_filters.toString()}` : '';
  let results: ApiResponseBody<Data> = {};
  let headers: ApiResponseHeaders;

  try {
    const response = await Axios.get(`${api_url}/${url}${query_string}`, {
      headers: prepHeaders({
        useCustomerKey,
        useSessionToken,
      }) as unknown as AxiosHeaders,
    });

    const res = parseResponse<Data>(response);
    results = res.results;
    headers = res.headers;
  } catch (api_error) {
    const res = processErrors(api_error);
    results = res.results;
    headers = res.headers;
  }
  return {
    headers,
    results,
  };
};

export const postApi = async <Data = any>({
  url,
  payload,
  pub,
  useCustomerKey,
  useSessionToken,
}: {
  url: string;
  payload?: Payload;
  pub?: boolean;
  useCustomerKey?: boolean;
  useSessionToken?: boolean;
}) => {
  console.log('postApi:', {
    url,
    payload,
    useCustomerKey,
    useSessionToken,
  });

  let results: ApiResponseBody<Data> = {};
  let headers: ApiResponseHeaders;

  try {
    const response = await Axios.post(
      `${pub === true ? api_public_url : api_url}/${url}`,
      payload,
      {
        headers: prepHeaders({
          useCustomerKey,
          useSessionToken,
        }) as unknown as AxiosHeaders,
      }
    );

    const res = parseResponse<Data>(response);
    results = res.results;
    headers = res.headers;
  } catch (api_error) {
    console.error('postApi:', { api_error });
    const res = processErrors(api_error);
    results = res.results;
    headers = res.headers;
  }
  return {
    headers,
    results,
  };
};

export const patchApi = async <Data = any>(url: string, payload?: Payload) => {
  let results: ApiResponseBody<Data> = {};
  let headers: ApiResponseHeaders;

  try {
    const response = await Axios.patch(`${api_url}/${url}`, payload, {
      headers: prepHeaders() as unknown as AxiosHeaders,
    });

    const res = parseResponse<Data>(response);
    results = res.results;
    headers = res.headers;
  } catch (api_error) {
    const res = processErrors(api_error);
    results = res.results;
    headers = res.headers;
  }
  return {
    headers,
    results,
  };
};

export const putApi = async <Data = any>(
  url: string,
  payload?: Payload | Moderation
) => {
  let results: ApiResponseBody<Data> = {};
  let headers: ApiResponseHeaders;

  try {
    const response = await Axios.put(`${api_url}/${url}`, payload, {
      headers: prepHeaders() as unknown as AxiosHeaders,
    });

    const res = parseResponse<Data>(response);
    results = res.results;
    headers = res.headers;
  } catch (api_error) {
    const res = processErrors(api_error);
    results = res.results;
    headers = res.headers;
  }
  return {
    headers,
    results,
  };
};

export const deleteApi = async <Data = any>({
  url,
  useCustomerKey,
  useSessionToken,
}: {
  url: string;
  useCustomerKey?: boolean;
  useSessionToken?: boolean;
}) => {
  let results: ApiResponseBody<Data> = {};
  let headers: ApiResponseHeaders;

  try {
    const response = await Axios.delete(`${api_url}/${url}`, {
      headers: prepHeaders({
        useCustomerKey,
        useSessionToken,
      }) as unknown as AxiosHeaders,
    });

    const res = parseResponse<Data>(response);
    results = res.results;
    headers = res.headers;
  } catch (api_error) {
    const res = processErrors(api_error);
    results = res.results;
    headers = res.headers;
  }
  return {
    headers,
    results,
  };
};
