export interface ErrorResponse {
  status: 'error';
  message: string;
  errors?: string[];
  error?: string;
}

export interface SuccessListResponse<T> {
  status: 'success';
  count: number;
  data: T[];
}

export interface SuccessSingleResponse<T> {
  status: 'success';
  message?: string;
  data: T;
}
