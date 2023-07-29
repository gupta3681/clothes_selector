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
  Container,
  Typography,
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SignOutButton from "../components/SignOutButton";
import Weather from "../components/Weather";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Statistics from "../components/Statistics";

function ClothesList() {
  const [clothes, setClothes] = useState([]);
  const auth = getAuth();
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState("");
  const handleImageClick = (imageURL) => {
    setIsImageOpen(true);
    setEnlargedImage(imageURL);
  };
  const handleCloseImage = () => {
    setIsImageOpen(false);
    setEnlargedImage("");
  };

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
  const columns = [
    { field: "company", headerName: "Company", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "imageURL",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (
        <Button
          size="small"
          color="primary"
          onClick={() => handleImageClick(params.value)}
        >
          View Image
        </Button>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        // Custom renderCell to show the delete button
        <Button
          size="small"
          color="secondary"
          onClick={() => deleteCloth(params.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Container>
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
            to="/add-clothes"
            variant="contained"
            color="secondary"
            size="small"
          >
            Add Clothes
          </Button>
          <SignOutButton />
        </Stack>
      </Stack>
      <Typography variant="body1" align="left" paddingBottom={2}>
        Hey there! Welcome to your virtual closet !
      </Typography>
      <Weather />
      <div style={{ height: 400, width: "100%" }} paddingBottom={2}>
        <DataGrid rows={clothes} columns={columns} />
      </div>
      <Statistics clothes={clothes} />
      {/* Image modal */}
      <Dialog open={isImageOpen} onClose={handleCloseImage}>
        <DialogTitle>Enlarged Image</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Card>
              <CardMedia component="img" height="400" image={enlargedImage} />
              <CardContent></CardContent>
              <CardActions>
                <Button onClick={handleCloseImage}>Close</Button>
              </CardActions>
            </Card>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default ClothesList;
