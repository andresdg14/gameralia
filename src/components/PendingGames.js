import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { GameItem } from './GameItem';

export const PendingGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const { data: games, error } = await supabase
      .from('pending_games')
      .select('*');

    if (error) {
      console.error('Error fetching games:', error);
    } else {
      setGames(games);
    }
  };

  return (
    <div>
      <h2>Videojuegos pendientes</h2>
      <ul>
        {games.map((game) => (
          <GameItem key={game.id} game={game.game_name} />
        ))}
      </ul>
    </div>
  );
};
