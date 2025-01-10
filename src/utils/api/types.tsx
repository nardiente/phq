import { ReactNode } from 'react';

export enum StatusCodes {
  OK_SUCCESS = 200,
  OK_EMPTY = 201,
  E_UNAUTHORIZED = 401,
  E_FORBIDDEN = 403,
  E_NOT_FOUND = 404,
  E_INTERNAL_SERVER_ERROR = 500,
}

interface Image {
  image: string;
  image_height: string;
  image_width: string;
}

export interface Payload {
  [key: string]:
    | string
    | boolean
    | number
    | Payload
    | number[]
    | Image[]
    | undefined
    | string[]
    | null;
}

export interface ApiResponseBody<Data = object> {
  error?: string;
  errors?: ApiFieldError[];
  message?: string;
  records?: Payload[];
  record?: Payload;
  data?: Data;
  user?: Payload;
  ms?: number;
}

export interface ApiResponseHeaders extends Payload {
  status: StatusCodes;
}

export type QueryStringParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

export interface PayloadOptions {
  headers?: {
    Authorization: string | void;
    'kasl-key'?: string | void;
  };
}

export interface ApiFieldError {
  field: string;
  message: string;
  error?: ReactNode;
}
