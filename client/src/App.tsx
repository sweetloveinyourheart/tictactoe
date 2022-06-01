import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import InviteModal from './components/modal/invite-modal';
import Auth from './pages/auth';
import Guide from './pages/guide';
import MatchHistoryPage from './pages/history';
import Home from './pages/home';
import MatchPage from './pages/match';
import PlayGroundPage from './pages/playground';
import TopPlayerPage from './pages/top-player';
import User from './pages/user';
import { Helmet } from 'react-helmet'

function App() {
  return (
    <Suspense>
      <InviteModal />
      <Helmet>
        <title>Tic Tac Toe</title>
      </Helmet>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/authentication' element={<Auth />} />
        <Route path='/user' element={<User />} />
        <Route path='/match' element={<MatchPage />} />
        <Route path='/playground' element={<PlayGroundPage />} />
        <Route path='/guide' element={<Guide />} />
        <Route path='/match-history' element={<MatchHistoryPage />} />
        <Route path='/top-player' element={<TopPlayerPage />} />
      </Routes>
    </Suspense>

  );
}

export default App;
