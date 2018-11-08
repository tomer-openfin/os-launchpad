export interface LoginErrorResponse {
  status: string | 'newPassword';
  message?: string;
  requiredFields?: string[];
}

export interface ErrorResponse {
  status: string;
  message?: string;
}
