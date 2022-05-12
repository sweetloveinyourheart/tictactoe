import { Route, Routes } from 'react-router-dom';
import Auth from './pages/auth';
import Home from './pages/home';
import MatchPage from './pages/match';
import User from './pages/user';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/authentication' element={<Auth />} />
      <Route path='/user' element={<User />} />
      <Route path='/match' element={<MatchPage />} />
    </Routes>
  );
}

export default App;
