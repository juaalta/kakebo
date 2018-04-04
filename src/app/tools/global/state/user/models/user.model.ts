export interface User {
  token: string;
  userIsAnonymous: boolean;
  userMessage: string;
  email: string;
}

export const userInitialState: User = {
  token: "",
  userIsAnonymous: true,
  userMessage: "",
  email: ""
};
