export interface User {
  token: string;
  userIsAnonymous: boolean;
  userMessage: string;
  email: string;
}

export const initialState: User = {
  token: "",
  userIsAnonymous: true,
  userMessage: "",
  email: ""
};
