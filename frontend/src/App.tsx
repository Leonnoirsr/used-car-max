import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/public-pages/HomePage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/public-pages/RegistrationPage';


function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path={'/'} element={<HomePage />}/>
          <Route path={'/register'} element={<RegistrationPage />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
