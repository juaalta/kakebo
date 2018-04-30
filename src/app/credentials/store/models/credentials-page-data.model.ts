import {
  Credential,
  credentialInitialState
} from './credential.model';

export interface CredentialsPageData {
  credential: Credential;
  title: string;
  endPoint: string;
  alternateAction: string;
}

export const credentialsPageDataInitialState: CredentialsPageData = {
  credential: credentialInitialState,
  title: '',
  endPoint: '',
  alternateAction: ''
};
