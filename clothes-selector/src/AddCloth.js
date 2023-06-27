import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Button, Container, TextField, Typography } from '@mui/material';

function AddClothes() {
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');

  const addCloth = async () => {
    const newCloth = {
      description,
      imageURL,
    };

    await addDoc(collection(db, 'clothes'), newCloth);

    setDescription('');
    setImageURL('');
  };

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>Add Clothes</Typography>
      <form noValidate autoComplete="off">
        <TextField 
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <TextField 
          label="Image URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={imageURL}
          onChange={e => setImageURL(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addCloth}>Add</Button>
      </form>
    </Container>
  );
}

export default AddClothes;
