export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface UploadRequest {
  workspaceId: string;
  file: File;
}

export interface ReportRequest {
  workspaceId: string;
}
