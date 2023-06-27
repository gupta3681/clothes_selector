import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
function ClothesList() {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const clothesCollection = collection(db, 'clothes');
      const clothesSnapshot = await getDocs(clothesCollection);
      const clothesList = clothesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClothes(clothesList);
    };
    fetchData();
  }, []);

  const deleteCloth = async (id) => {
    const clothRef = doc(db, 'clothes', id);
    await deleteDoc(clothRef);

    // Remove the cloth from local state
    setClothes(clothes.filter(cloth => cloth.id !== id));
  };

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>Clothes</Typography>
      <Button component={RouterLink} to="/add" variant="contained" color="primary">Add Clothes</Button>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '1em' }}>
        {clothes.map((cloth) =>
          <Box key={cloth.id} sx={{ width: '200px', margin: '1em' }}>
            <Card>
            <CardMedia
              component="img"
              height="140"
              image={cloth.imageURL}
              alt={cloth.description}
            />
            <CardContent  style={{ height: 100, overflow: 'auto' }}>
            <Typography variant="body1" color="text.secondary"fontWeight="bold">
                {cloth.company}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {cloth.type}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontStyle="italic">
                {cloth.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="secondary" onClick={() => deleteCloth(cloth.id)}>Delete</Button>
            </CardActions>
          </Card>
          </Box>
        )}
      </div>
    </Container>
  )
}

export default ClothesList;
