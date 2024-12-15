import { useMutation } from "react-query";
import BASE_URL from "../../constants/BASEURL";

const authenticate = async (code: string): Promise<string> => {
  const response = await BASE_URL.post("/auth/authenticate", { code });
  if (response.status === 200) {
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  }
  throw new Error("Unauthorized");
};

export const useAuthenticate = () => {
  return useMutation(authenticate);
};
