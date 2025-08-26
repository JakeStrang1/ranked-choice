export interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
  message?: string;
  databaseStatus?: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
}
