export interface Credential {
  email: string;
  password: string;
}

export const credentialInitialState: Credential = {
  email: '',
  password: ''
};
