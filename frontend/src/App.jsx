import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Products from './components/Products';
import Footer from './components/Footer';
import './App.css'; 

const App = () => {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };
  return (
    <Routes>
      <Route path="/login" element={<AuthForm />} />
      <Route
        path="/app"
        element={
          isAuthenticated() ? (
            <>
              <Products />
              <Footer />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;

