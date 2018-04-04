export interface User {
  token: string;
  userIsAnonymous: boolean;
  email: string;
}

export const userInitialState: User = {
  token: "",
  userIsAnonymous: true,
  email: ""
};
