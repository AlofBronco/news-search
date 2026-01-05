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
  CircularProgress,
} from "@mui/material";
import Cards from "../Cards/Cards";
import css from "./Home.module.scss";
import SearchInput from "../SearchInput/SearchInput";
import { useKeywordStore } from "../../store/news";
import { useMemo } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { sortByKeywordPriority } from "../../utils/sortByKeywordPriority";

const Home = () => {
  const keywords = useKeywordStore((state) => state.keywords);
  const debouncedKeywords = useDebounce(keywords, 300);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["news", debouncedKeywords],
    queryFn: ({ pageParam }) => fetchNews(debouncedKeywords, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: FetchNewsResponse) =>
      lastPage.next ?? undefined,
  });

  const articles = useMemo(() => {
    const flat = data?.pages.flatMap((page) => page.results) ?? [];
    return sortByKeywordPriority(flat, debouncedKeywords);
  }, [data, debouncedKeywords]);

  if (error)
    return (
      <Typography variant="h2">
        There is an error:{" "}
        {error instanceof Error ? error.message : String(error)}
      </Typography>
    );

  return (
    <Container sx={{ py: 4 }}>
      <SearchInput />
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" fontWeight={600} fontSize="1rem">
          Results: {articles.length}
        </Typography>
        <Divider sx={{ mb: 3 }} />
      </Box>
      <Grid container spacing={3} columns={3} className={css.grid}>
        <Cards articles={articles} />
        {isLoading && (
          <CircularProgress
            color="inherit"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
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
