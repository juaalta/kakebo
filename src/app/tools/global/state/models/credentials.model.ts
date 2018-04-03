export interface Credential {
  email: string;
  password: string;
  service: string;
}

export interface CredentialResponse {
  token: string;
}
