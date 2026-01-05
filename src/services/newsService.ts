import axios from "axios";
import type { Article, FetchNewsResponse } from "../types/news";

axios.defaults.baseURL = "https://api.spaceflightnewsapi.net/v4/";

export const fetchNews = async (
  keywords: string[],
  pageParam?: string,
): Promise<FetchNewsResponse> => {
  const res = await axios.get<FetchNewsResponse>(pageParam ?? "articles", {
    params: pageParam ? undefined : { limit: 30, search: keywords.join(" ") },
  });

  return res.data;
};

export const fetchNewsById = async (id: number): Promise<Article> => {
  const res = await axios.get<Article>(`articles/${id}`);

  return res.data;
};
