export interface Global {
  userToken?: string;
  userIsAnonymous: boolean;
  userMessage: string;
}

export const globalInitialState: Global = {
  userIsAnonymous: true,
  userMessage: 'Welcome to kakebo'
};
