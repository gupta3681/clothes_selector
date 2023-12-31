import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link as RouterLink } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  Alert,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SignOutButton from "../components/SignOutButton";
import { Header } from "../components/Header";

function AddClothes() {
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const clothTypes = ["T-Shirt", "Jeans", "Jacket", "Sweater", "Shorts"];
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const addCloth = async () => {
    const auth = getAuth();
    setLoading(true);
    const newCloth = {
      description,
      imageURL,
      company,
      type,
      ownerId: currentUserId,
    };

    try {
      await addDoc(collection(db, "clothes"), newCloth);
      setIsSuccess(true);
      setDescription("");
      setImageURL("");
      setCompany("");
      setType("");
    } catch (error) {
      console.error("Error adding cloth: ", error);
    }

    setLoading(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSuccess(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (company === "" || type === "" || description === "") {
      setError("Please fill in all required fields.");
      return;
    }
    addCloth();
  };

  return (
    <Container>
      <Header />
      <Stack
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={"row"}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Bought a new cloth? add it here!
        </Typography>
      </Stack>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="Company"
          variant="outlined"
          fullWidth
          margin="normal"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Type"
            required
          >
            {clothTypes.map((clothType) => (
              <MenuItem key={clothType} value={clothType}>
                {clothType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          style={{ marginRight: "1em" }}
        >
          {loading ? <CircularProgress size={24} /> : "Add"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={RouterLink}
          to="/clothes-list"
        >
          Clothes List
        </Button>
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
            Successfully added!
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
}

export default AddClothes;
