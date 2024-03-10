import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/public-pages/HomePage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/public-pages/RegistrationPage';
import { Container } from '@chakra-ui/react';
import { useLocation } from 'react-router';


function App() {

  return (
    <Router>
      <Container maxW={'10xl'}>
        <Navbar />
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/register'} element={<RegistrationPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
