export interface User {
  name: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
  admin: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}
