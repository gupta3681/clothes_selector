import React from "react";
import { Button, Box } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignOutButton() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/auth"); // Redirect the user to the authentication page after signing out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <Box mt={2} display="flex" justifyContent="center">
      <Button
        onClick={handleSignOut}
        variant="contained"
        color="primary"
        size="small"
      >
        Sign Out
      </Button>
    </Box>
  );
}

export default SignOutButton;
