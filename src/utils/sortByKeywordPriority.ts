import type { Article } from "../types/news";

export const sortByKeywordPriority = (
  articles: Article[],
  keywords: string[],
) => {
  if (!keywords.length) return articles;

  const lowerKeywords = keywords.map((k) => k.toLowerCase());

  const score = (text: string) =>
    lowerKeywords.reduce(
      (acc, k) => (text.toLowerCase().includes(k) ? acc + 1 : acc),
      0,
    );

  return [...articles].sort((a, b) => {
    const titleScoreA = score(a.title);
    const titleScoreB = score(b.title);

    if (titleScoreA !== titleScoreB) {
      return titleScoreB - titleScoreA;
    }

    const descScoreA = score(a.summary);
    const descScoreB = score(b.summary);

    return descScoreB - descScoreA;
  });
};
