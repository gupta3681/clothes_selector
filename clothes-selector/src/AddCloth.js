import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from './firebase';

function AddCloth() {
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');

  async function onSubmit(e) {
    e.preventDefault();

    await addDoc(collection(db, 'clothes'), {
      imageURL,
      description
    });

    setImageURL('');
    setDescription('');
  }

  return (
    <form onSubmit={onSubmit}>
      <h4>Add New Cloth</h4>
      <div>
        <label>Image URL</label>
        <input type="text" value={imageURL} onChange={e => setImageURL(e.currentTarget.value)} />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.currentTarget.value)} />
      </div>
      <button>Add</button>
    </form>
  )
}

export default AddCloth;
