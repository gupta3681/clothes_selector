import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Container, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


function AddClothes() {
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [company, setCompany] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const clothTypes = ["T-Shirt", "Jeans", "Jacket", "Sweater", "Shorts"];

  const addCloth = async () => {
    setLoading(true);
    const newCloth = {
      description,
      imageURL,
      company,
      type,
    };
    
    try {
      await addDoc(collection(db, 'clothes'), newCloth);
      setIsSuccess(true);
      setDescription('');
      setImageURL('');
      setCompany('');
      setType('');
    } catch (error) {
      console.error("Error adding cloth: ", error);
    }

    setLoading(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSuccess(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addCloth();
  };

  return (
    
    <Container>
      <Typography variant="h2" align="center" gutterBottom>Add Clothes</Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField 
          label="Company"
          variant="outlined"
          fullWidth
          margin="normal"
          value={company}
          onChange={e => setCompany(e.target.value)}
          required 
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={e => setType(e.target.value)}
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
          onChange={e => setDescription(e.target.value)}
          required 
        />
        <TextField 
          label="Image URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={imageURL}
          onChange={e => setImageURL(e.target.value)}
          required 
        />
        <Button variant="contained" color="primary" onClick={addCloth} disabled={loading} style={{ marginRight: '1em' }}>
          {loading ? <CircularProgress size={24} /> : 'Add'}
        </Button>
        <Button variant="contained" color="secondary" component={RouterLink} to="/">Clothes List</Button>
      </form>
      {isSuccess && <Snackbar open={isSuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Successfully added!
        </Alert>
      </Snackbar>}
    </Container>
  );
}

export default AddClothes;
