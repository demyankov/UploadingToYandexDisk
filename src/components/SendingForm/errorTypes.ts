import { AxiosResponse, AxiosError } from 'axios';

export function isAxiosResponseError(error: any): error is AxiosResponse<any> {
  return error && typeof error === 'object' && 'data' in error;
}

export function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError === true;
}
