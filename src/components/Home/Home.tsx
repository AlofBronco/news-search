import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchNews } from "../../services/newsService";
import type { FetchNewsResponse } from "../../types/news";
import {
  Container,
  Button,
  Grid,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import Cards from "../Cards/Cards";
import css from "./Home.module.scss";
import SearchInput from "../SearchInput/SearchInput";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";

const Home = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["news"],
    queryFn: ({ pageParam }) => fetchNews(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: FetchNewsResponse) =>
      lastPage.next ?? undefined,
  });

  const articles = data?.pages.flatMap((page) => page.results) ?? [];

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
    <Container sx={{ py: 4 }}>
      <SearchInput />
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" fontWeight={600} fontSize="1rem">
          Results: {data?.pages.at(-1)?.count}
        </Typography>
        <Divider sx={{ mb: 3 }} />
      </Box>
      <Grid container spacing={3} columns={3} className={css.grid}>
        <Cards articles={articles} />
      </Grid>
      {hasNextPage && (
        <Button
          variant="contained"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          sx={{ mx: "auto", display: "block" }}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      )}
    </Container>
  );
};

export default Home;
