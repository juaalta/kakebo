export interface Message {
  caption: string;
  type: "info" | "warning" | "error";
}

export const messageInitialState: Message = {
  caption: "",
  type: "info"
};
