export const dateFormat = (iso: string): string => {
  const date = new Date(iso);

  const formatted = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  function withOrdinal(day: number): string {
    if (day > 3 && day < 21) return `${day}th`;

    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }

  const day = date.getDate();

  return formatted.replace(String(day), withOrdinal(day));
};
