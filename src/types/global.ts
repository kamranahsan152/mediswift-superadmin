/* eslint-disable react-hooks/exhaustive-deps */
import { useUserInfoQuery, useVerifyTokenQuery } from "src/redux/reducer";
import { store } from "src/redux/store";

export const GetToken = () => {
  const authToken = store.getState();
  return authToken.user.authToken || "";
};
export const useUserData = () => {
  const { data: tokenData } = useVerifyTokenQuery("");
  const { data: userInfo } = useUserInfoQuery({
    id: tokenData?.decoded?.user?.id,
  });
  return userInfo?.user || {};
};
