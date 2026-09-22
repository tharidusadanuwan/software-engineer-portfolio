export interface Admin {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  admin: Admin;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}