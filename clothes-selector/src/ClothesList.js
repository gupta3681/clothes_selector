import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from '@mui/material';

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
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '1em' }}>
        {clothes.map((cloth) =>
          <Card key={cloth.id} style={{ maxWidth: 345, margin: '1em' }}>
            <CardMedia
              component="img"
              height="140"
              image={cloth.imageURL}
              alt={cloth.description}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {cloth.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="secondary" onClick={() => deleteCloth(cloth.id)}>Delete</Button>
            </CardActions>
          </Card>
        )}
      </div>
    </Container>
  )
}

export default ClothesList;
