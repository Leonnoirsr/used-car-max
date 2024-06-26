import './App.css';
import { BrowserRouter as Router, Route, Routes }         from 'react-router-dom';
import { Toaster }                                        from 'react-hot-toast';
import { Container }                                      from '@chakra-ui/react';
import Navbar                                             from './components/Navbar';
import HomePage                                           from './pages/public-pages/HomePage';
import RegistrationPage                                   from './pages/public-pages/RegistrationPage';
import LoginPage                                          from './pages/public-pages/LoginPage';
import SignOutPage                                        from './pages/public-pages/SignOutPage';
import ReportsPage                                        from './pages/user-pages/ReportsPage';
import CreateReportPage                                   from './pages/user-pages/CreateReportPage';


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
          <Route path={'/signout'} element={<SignOutPage />} />
          <Route path={'/reports'} element={<ReportsPage />} />
          <Route path={'/create-report'} element={<CreateReportPage />} />
        </Routes>

      </Container>

    </Router>

  );

}

export default App;
