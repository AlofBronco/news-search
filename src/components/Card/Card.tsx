import { Link } from "react-router-dom";
import type { Article } from "../../types/news";
import {
  Card as CardBlock,
  CardContent,
  Typography,
  CardMedia,
  Stack,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import css from "./Card.module.scss";
import { dateFormat } from "../../utils/dateFormat";
import { useHighlight } from "../../hooks/useHighlight";
import { useKeywordStore } from "../../store/news";

interface CardProps {
  article: Article;
}

const Card = ({ article }: CardProps) => {
  const keywords = useKeywordStore((state) => state.keywords);

  const highlightedTitle = useHighlight(article.title, keywords);
  const highlightedSummary = useHighlight(
    article.summary.length < 100
      ? article.summary
      : article.summary.slice(0, 100) + "...",
    keywords,
  );

  return (
    <CardBlock className={css.card}>
      <CardMedia
        component={"img"}
        image={article.image_url}
        alt={article.title}
        height={200}
        sx={{ objectFit: "cover" }}
        loading="lazy"
      />
      <CardContent>
        <Typography variant="subtitle2" className={css.date}>
          <CalendarTodayIcon /> {dateFormat(article.published_at)}
        </Typography>

        <Stack spacing={2} height="100%" flexDirection="column">
          <Typography variant="h2" className={css.title}>
            {highlightedTitle}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            className={css.text}
          >
            {highlightedSummary}
          </Typography>

          <Link to={`/news/${article.id}`} className={css.link}>
            Read more
            <EastIcon />
          </Link>
        </Stack>
      </CardContent>
    </CardBlock>
  );
};

export default Card;
