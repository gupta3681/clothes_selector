import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AddClothes from "./pages/AddCloth";
import Auth from "./pages/Auth";
import ClothesList from "./pages/ClothesList";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={user ? <Navigate to="/clothes-list" /> : <Auth />}
        />

        {user ? (
          <Route path="/clothes-list" element={<ClothesList />} />
        ) : (
          <Route path="/clothes-list" element={<Navigate to="/auth" />} />
        )}

        {user ? (
          <Route path="/add-clothes" element={<AddClothes />} />
        ) : (
          <Route path="/add-clothes" element={<Navigate to="/auth" />} />
        )}

        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;
