import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const auth = getAuth();

  const handleEmailPasswordSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      setIsSuccess(true);
      setEmail("");
      setPassword("");
      setError(null);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      setIsSuccess(true);
      setEmail("");
      setPassword("");
      setError(null);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSuccess(false);
  };

  return (
    <Container>
      <Typography variant="h1" align="center" gutterBottom>
        {isSuccess ? "Success!" : "Login / Register"}
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleEmailPasswordSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login or Register"}
          </Button>
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign in with Google"}
          </Button>
        </Box>
      </form>
      {isSuccess && (
        <Snackbar
          open={isSuccess}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {error ? "Error occurred." : "Welcome !"}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
}

export default Auth;
