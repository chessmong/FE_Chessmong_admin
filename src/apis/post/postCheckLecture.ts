import { useMutation } from "react-query";
import BASE_URL from "../../constants/BASEURL";

const checkLecture = async (link: string): Promise<void> => {
  const response = await BASE_URL.post("/lectures/check", { link });
  if (response.status !== 200) {
    throw new Error(response.data?.message || "Unknown error");
  }
};

export const useCheckLecture = () => {
  return useMutation(checkLecture);
};
