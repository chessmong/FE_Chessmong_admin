import { useMutation } from "react-query";
import BASE_URL from "../../constants/BASEURL";

const addLecture = async (lectureData: { link: string; positions: string[] }): Promise<void> => {
  const response = await BASE_URL.post("/lectures", lectureData);

  if (response.status !== 201) {
    throw new Error(response.data?.message || "강의 추가에 실패했습니다.");
  }
};

export const useAddLecture = () => {
  return useMutation(addLecture);
};
