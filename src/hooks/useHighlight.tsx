import { useMemo } from "react";

export const useHighlight = (text: string, keywords: string[]) => {
  const highlighted = useMemo(() => {
    if (!keywords.length) return <>{text}</>;

    const escapedKeywords = keywords.map((k) =>
      k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    );
    const regex = new RegExp(`(${escapedKeywords.join("|")})`, "gi");

    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) =>
          keywords.some((k) => k.toLowerCase() === part.toLowerCase()) ? (
            <span key={i} style={{ backgroundColor: "yellow" }}>
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </>
    );
  }, [text, keywords]);

  return highlighted;
};
