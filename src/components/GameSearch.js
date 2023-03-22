// src/components/GameSearch.js
import React, { useState } from 'react';
import { igdbClient } from '../igdbClient';

export const GameSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchGames = async (query) => {
    try {
      const response = await igdbClient.post('/search', null, {
        params: { q: query },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching games:', error);
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    searchGames(searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Buscar videojuegos"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Buscar</button>
      </form>
      <ul>
        {searchResults.map((game) => (
          <li key={game.id}>
            {game.name}
            {/* Agrega un botón o enlace aquí para agregar el juego a la lista de juegos pendientes */}
          </li>
        ))}
      </ul>
    </div>
  );
};
