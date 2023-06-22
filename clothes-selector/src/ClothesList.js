import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Link } from 'react-router-dom';

import './ClothesList.css';


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
    <div>
      <h2 className='heading'>Clothes</h2>
      <Link to="/add">
        <button>Add Clothes</button>
      </Link>
      <div className='clothes-container'>
      {clothes.map((cloth) => 
        <div className='cloth-card' key={cloth.id}>
          <img src={cloth.imageURL} alt={cloth.description} />
          <p>{cloth.description}</p>
          <button onClick={() => deleteCloth(cloth.id)}>Delete</button>
        </div>
      )}
      </div>
      
    </div>
  )
}

export default ClothesList;
