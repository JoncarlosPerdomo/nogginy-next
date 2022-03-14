import * as React from "react";
import { Box, Button } from "@mui/material";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <Box sx={{ maxWidth: "100vw", textAlign: "right", m: 2 }}>
      <Button variant="contained">Login</Button>
      <Button>Sign Up</Button>
    </Box>
  );
}
