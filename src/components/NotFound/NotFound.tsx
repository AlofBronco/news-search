import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box>
      <Typography variant="body1">Page not found</Typography>
      <Link to="/news">Return to Home</Link>
    </Box>
  );
};

export default NotFound;
