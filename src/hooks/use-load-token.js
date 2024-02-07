import { useEffect, useCallback } from "react";
import { api } from "../config/axios";

export const useLoadToken = () => {
  const getToken = useCallback(async () => {
    const response = await api("/getAccessToken");
    const token = await response.data;

    localStorage.setItem("@access_token", token.access_token);
  }, []);

  useEffect(() => {
    const alreadyHasToken = localStorage.getItem("@access_token");

    if (!alreadyHasToken) {
      getToken();
    }
  }, [getToken]);
};
