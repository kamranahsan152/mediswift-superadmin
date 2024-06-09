import { store } from "src/redux/store";

export const GetToken = () => {
  const authToken = store.getState();
  return authToken.user.authToken || "";
};
