import Axios, { AxiosHeaders, AxiosProgressEvent } from 'axios';
import {
  ApiResponseBody,
  ApiResponseHeaders,
  Payload,
  QueryStringParams,
} from './types';
import { parseResponse, prepHeaders, processErrors } from './utils';
import { Moderation } from '../../types/moderation';
import { Segment } from '../../types/segment';
import { Widget } from '../../contexts/WidgetContext/type';
import { Notification, NotificationRequest } from '../../types/notification';

export const api_url = import.meta.env.VITE_API_HOST;
export const api_public_url = import.meta.env.VITE_API_HOST_PUBLIC;

export const getApi = async <Data = any>({
  url,
  params,
  useSessionToken,
  useCustomerKey,
}: {
  url: string;
  params?: QueryStringParams;
  useSessionToken?: boolean;
  useCustomerKey?: boolean;
}) => {
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
  onUploadProgress,
  payload,
  pub,
  useCustomerKey,
  useSessionToken,
  useOnboardingToken,
}: {
  url: string;
  payload?:
    | Payload
    | NotificationRequest
    | Widget
    | Partial<Segment>
    | {
        attachments: (
          | {
              file_name: string;
              content_type: string;
              content: string;
            }
          | {
              file_name: string;
              url: string;
            }
        )[];
      }
    | {
        description: string;
        title: string;
        type: string;
      }[];
  pub?: boolean;
  useCustomerKey?: boolean;
  useSessionToken?: boolean;
  useOnboardingToken?: boolean;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}) => {
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
          useOnboardingToken,
        }) as unknown as AxiosHeaders,
        onUploadProgress,
      }
    );

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
  payload?: Payload | Moderation | Partial<Notification | Widget | Segment>
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
  pub = false,
  url,
  useCustomerKey,
  useSessionToken,
}: {
  pub?: boolean;
  url: string;
  useCustomerKey?: boolean;
  useSessionToken?: boolean;
}) => {
  let results: ApiResponseBody<Data> = {};
  let headers: ApiResponseHeaders;

  try {
    const response = await Axios.delete(
      `${pub ? api_public_url : api_url}/${url}`,
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
    const res = processErrors(api_error);
    results = res.results;
    headers = res.headers;
  }
  return {
    headers,
    results,
  };
};
