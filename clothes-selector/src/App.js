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
    return <div>Loading...</div>; // You can display a loader while checking the authentication status.
  }

  return (
    <Router>
      <Routes>
        {/* Route for the login/register page */}
        <Route
          path="/auth"
          element={user ? <Navigate to="/clothes-list" /> : <Auth />}
        />
        {/* Private route for the clothes list page */}
        {user ? (
          <Route path="/clothes-list" element={<ClothesList />} />
        ) : (
          <Route path="/clothes-list" element={<Navigate to="/auth" />} />
        )}
        {/* Private route for the add clothes page */}
        {user ? (
          <Route path="/add-clothes" element={<AddClothes />} />
        ) : (
          <Route path="/add-clothes" element={<Navigate to="/auth" />} />
        )}
        {/* Redirect to the login/register page for any other route */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;
