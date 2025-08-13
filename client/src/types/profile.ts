export interface User {
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
