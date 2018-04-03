export interface User {
  loading: boolean;
  token: string;
  userIsAnonymous: boolean,
  userMessage: string,
  email: string,
  password: string
}

export const initialState: User = {
  loading:false,
  token: "",
  userIsAnonymous: true,
  userMessage: "",
  email: "",
  password: ""
};
