import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/public-pages/HomePage';
import RegistrationPage from './pages/public-pages/RegistrationPage';
import LoginPage from './pages/public-pages/LoginPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Container } from '@chakra-ui/react';


function App() {

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Container maxW={'10xl'}>
        <Navbar />
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/register'} element={<RegistrationPage />} />
          <Route path={'/login'} element={<LoginPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
