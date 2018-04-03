export interface User {
  comunicating: boolean;
  token: string;
  userIsAnonymous: boolean;
  userMessage: string;
  email: string;
  password: string;
  isNew: boolean;
}

export const initialState: User = {
  comunicating: false,
  token: "",
  userIsAnonymous: true,
  userMessage: "",
  email: "",
  password: "",
  isNew: false
};
