import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchNewsById } from "../../services/newsService";
import WestIcon from "@mui/icons-material/West";
import css from "./Article.module.scss";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";

const Article = () => {
  const { id } = useParams();
  const articleId = id ? Number(id) : undefined;

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["news", articleId],
    queryFn: () => fetchNewsById(articleId!),
    enabled: !!articleId,
  });

  if (isLoading) return <FullScreenLoader open={true} />;

  if (error)
    return (
      <Typography variant="h2">
        There is an error:{" "}
        {error instanceof Error ? error.message : String(error)}
      </Typography>
    );

  if (!data) return null;

  return (
    <>
      <Box
        component="img"
        src={data?.image_url}
        alt={data?.title}
        sx={{
          width: "100%",
          height: 200,
          objectFit: "cover",
        }}
      />
      <Container
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
        }}
      >
        <Card>
          <CardContent>
            <Typography
              variant="h2"
              fontSize="2rem"
              textAlign="center"
              gutterBottom
            >
              {data?.title}
            </Typography>
            <Typography variant="body1" textAlign="center">
              {data?.summary}
            </Typography>
          </CardContent>
        </Card>
      </Container>
      <button onClick={goBack} className={css.link}>
        <WestIcon />
        Back to homepage
      </button>
    </>
  );
};

export default Article;
