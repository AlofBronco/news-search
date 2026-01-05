import { InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = () => {
  return (
    <>
      <Typography sx={{ mb: 1.5 }} fontWeight={600} variant="body1">
        Filter by keywords
      </Typography>
      <TextField
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
