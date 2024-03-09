import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/public-pages/HomePage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/public-pages/RegistrationPage';
import { Container } from '@chakra-ui/react';


function App() {
  return (
    <Container maxW={'10xl'}>
      <Navbar />
      <Router>
        <Routes>
          <Route path={'/'} element={<HomePage />}/>
          <Route path={'/register'} element={<RegistrationPage />} />
        </Routes>
      </Router>
    </Container>

  );
}

export default App;
