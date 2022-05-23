import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import InviteModal from './components/modal/invite-modal';
import Auth from './pages/auth';
import Guide from './pages/guide';
import Home from './pages/home';
import MatchPage from './pages/match';
import PlayGroundPage from './pages/playground';
import User from './pages/user';

function App() {
  return (
    <Suspense>
      <InviteModal />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/authentication' element={<Auth />} />
        <Route path='/user' element={<User />} />
        <Route path='/match' element={<MatchPage />} />
        <Route path='/playground' element={<PlayGroundPage />} />
        <Route path='/guide' element={<Guide />} />
      </Routes>
    </Suspense>

  );
}

export default App;
