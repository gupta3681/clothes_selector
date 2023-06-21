import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase';

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

  return (
    <div>
      <h2>Clothes</h2>
      {clothes.map((cloth) => 
        <div key={cloth.id}>
          <img src={cloth.imageURL} alt={cloth.description} />
          <p>{cloth.description}</p>
        </div>
      )}
    </div>
  )
}

export default ClothesList;
