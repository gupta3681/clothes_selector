import React from "react";
import {
  Button,
  Container,
  Typography,
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { Link as RouterLink, useLocation, useHistory } from "react-router-dom";
import SignOutButton from "../components/SignOutButton";

export const Header = () => {
  const location = useLocation();

  return (
    <Stack
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="row"
      sx={{ marginBottom: "1em" }}
    >
      <Typography variant="h2" align="center" gutterBottom>
        closetMate
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          component={RouterLink}
          variant="contained"
          color="secondary"
          size="small"
          to={
            location.pathname === "/clothes-list"
              ? "/add-clothes"
              : "/clothes-list"
          }
        >
          {location.pathname === "/clothes-list"
            ? "Add Clothes"
            : "Clothes List"}
        </Button>
        <SignOutButton />
      </Stack>
    </Stack>
  );
};
