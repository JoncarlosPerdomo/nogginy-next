import * as React from "react";
import { Box, Button } from "@mui/material";
import Link from "next/link";
export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <Box sx={{ maxWidth: "100vw", textAlign: "right", m: 2 }}>
      <Link href="/login" passHref>
        <Button variant="contained">Login</Button>
      </Link>
      <Link href="/login" passHref>
        <Button>Sign Up</Button>
      </Link>
    </Box>
  );
}
