import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import api from "../services/api";

export function useAxiosAuth() {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        console.log("JWT TOKEN:", token);

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      }
    );

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [getToken]);
}