/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  useLazyUserInfoQuery,
  useUserInfoQuery,
  useVerifyTokenQuery,
} from "src/redux/reducer";
import { store } from "src/redux/store";

export const GetToken = () => {
  const authToken = store.getState();
  return authToken.user.authToken || "";
};
export const useUserData = () => {
  const { data: tokenData } = useVerifyTokenQuery("");
  const [trigger] = useLazyUserInfoQuery();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (
      tokenData &&
      tokenData.decoded &&
      tokenData.decoded.user &&
      tokenData.decoded.user.id
    ) {
      trigger({ id: tokenData.decoded.user.id })
        .then((response) => {
          if (response.data) {
            setUserData(response.data.user);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUserData(null);
        });
    }
  }, [tokenData, trigger]);
  return userData || {};
};
