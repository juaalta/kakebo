export interface Global {
  userToken: string;
  userIsAnonymous: boolean;
  userMessage: string;
}

export const globalInitialState: Global = {
  userToken: "",
  userIsAnonymous: true,
  userMessage: ""
};
