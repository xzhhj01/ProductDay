'use server';

import { instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";
//예시 코드 1
export async function getPosts(title) {
  console.log(`${API_PATH}/post/info/${title}`);
  const response = await instance.get(`${API_PATH}/post/info/${title}`);
  
  return {
    isSuccess: true,
    isFailure: true,
    data: response.data
  };
}

//이 밑으로 작성