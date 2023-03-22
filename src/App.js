import React from 'react';
import { GameSearch } from './components/GameSearch';
import { PendingGames } from './components/PendingGames';

function App() {
  return (
    <div>
      <h1>Gameralia</h1>
      <GameSearch />
      <PendingGames />
    </div>
  );
}

export default App;
