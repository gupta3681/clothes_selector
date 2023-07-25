import React, { useEffect, useState } from "react";
import {
  getDocs,
  query,
  where,
  collection,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link as RouterLink } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import SignOutButton from "../components/SignOutButton";

function ClothesList() {
  const [clothes, setClothes] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUserId = user.uid;
        // Query clothes collection where the ownerId is equal to the current user's ID
        const clothesCollection = collection(db, "clothes");
        const clothesQuery = query(
          clothesCollection,
          where("ownerId", "==", currentUserId)
        );
        const fetchClothes = async () => {
          const clothesSnapshot = await getDocs(clothesQuery);
          const clothesList = clothesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setClothes(clothesList);
        };
        fetchClothes();
      }
    });

    return () => unsubscribe();
  }, [auth]);
  const deleteCloth = async (id) => {
    const clothRef = doc(db, "clothes", id);
    await deleteDoc(clothRef);

    // Remove the cloth from local state
    setClothes(clothes.filter((cloth) => cloth.id !== id));
  };

  return (
    <Container>
      <Stack
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={"row"}
      >
        <Typography variant="h2" align="center" gutterBottom>
          Clothes
        </Typography>
        <SignOutButton />
      </Stack>
      <Button
        component={RouterLink}
        to="/add-clothes"
        variant="contained"
        color="primary"
      >
        Add Clothes
      </Button>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          marginTop: "1em",
        }}
      >
        {clothes.map((cloth) => (
          <Box key={cloth.id} sx={{ width: "200px", margin: "1em" }}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={cloth.imageURL}
                alt={cloth.description}
              />
              <CardContent style={{ height: 100, overflow: "auto" }}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  {cloth.company}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cloth.type}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontStyle="italic"
                >
                  {cloth.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => deleteCloth(cloth.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </div>
    </Container>
  );
}

export default ClothesList;
