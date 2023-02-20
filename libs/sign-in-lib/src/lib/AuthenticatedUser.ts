
export interface AuthenticatedUser {
  email: string;
  token: string;
  expiry: number;
  refreshToken: string;
}
