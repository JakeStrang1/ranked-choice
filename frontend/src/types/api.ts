export interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
  message?: string;
  databaseStatus?: string;
}



