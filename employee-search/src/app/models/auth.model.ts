export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  tenantId: string;
  tenantName: string;
  token?: string;
}

export interface User {
  email: string;
}
