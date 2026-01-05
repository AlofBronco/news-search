import { Grid } from "@mui/material";
import type { Article } from "../../types/news";
import Card from "../Card/Card";

interface CardsProps {
  articles: Article[] | undefined;
}

const Cards = ({ articles }: CardsProps) => {
  return articles?.map((article) => (
    <Grid key={article.id} size={1}>
      <Card article={article} />
    </Grid>
  ));
};

export default Cards;
