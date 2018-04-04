export interface Message {
  caption: string;
  type: "info" | "warn" | "error";
}

export const messageInitialState: Message = {
  caption: "",
  type: "info"
};
