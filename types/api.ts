export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: PaginationMeta
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  errorDetails?: unknown;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}