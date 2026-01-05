import axios from "axios";
import type { Article, FetchNewsResponse } from "../types/news";

axios.defaults.baseURL = "https://api.spaceflightnewsapi.net/v4/";

export const fetchNews = async (
  pageParam?: string,
): Promise<FetchNewsResponse> => {
  const res = await axios.get<FetchNewsResponse>(pageParam ?? "articles", {
    params: pageParam ? undefined : { limit: 6 },
  });

  return res.data;
};

export const fetchNewsById = async (id: number): Promise<Article> => {
  const res = await axios.get<Article>(`articles/${id}`);

  return res.data;
};
