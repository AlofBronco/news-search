import { InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useKeywordStore } from "../../store/news";

const SearchInput = () => {
  const keywords = useKeywordStore((state) => state.keywords);
  const [input, setInput] = useState(keywords.join(" "));
  const setKeywords = useKeywordStore((state) => state.setKeywords);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    const keywords = value.split(/\s*,\s*|\s+/).filter(Boolean);
    setKeywords(keywords);
  };

  return (
    <>
      <Typography sx={{ mb: 1.5 }} fontWeight={600} variant="body1">
        Filter by keywords
      </Typography>
      <TextField
        value={input}
        onChange={handleChange}
        sx={{ mb: 2.5 }}
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          },
        }}
      />
    </>
  );
};

export default SearchInput;
