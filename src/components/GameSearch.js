import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { igdbClient } from '../igdbClient';

export const GameSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchGames = async (query, page = 0) => {
    try {
      const offset = page * 10;
      const response = await igdbClient.post('/search', null, {
        params: { q: query, offset: offset },
      });
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error searching games:', error);
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setCurrentPage(0); // Reinicia la página actual cuando se realiza una nueva búsqueda
    searchGames(searchTerm, currentPage);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      searchGames(searchTerm, currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    searchGames(searchTerm, currentPage + 1);
  };

  const addToPendingGames = async (game) => {
    // if (!supabase.auth.user()) {
    //   console.error('No hay un usuario autenticado');
    //   return;
    // }

    try {
      const { data, error } = await supabase.from('pending_games').insert([
        {
          game_id: game.id,
          game_name: game.name,
          game_cover: game.cover?.url,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        throw error;
      }

      console.log('Juego añadido a la lista de juegos pendientes:', data);
    } catch (error) {
      console.error(
        'Error al agregar el juego a la lista de juegos pendientes:',
        error
      );
    }
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
            <button onClick={() => addToPendingGames(game)}>
              Agregar a la lista de juegos pendientes
            </button>
          </li>
        ))}
      </ul>
      {searchResults.length > 0 && (
        <>
          <button onClick={handlePreviousPage} disabled={currentPage === 0}>
            Anterior
          </button>
          <button onClick={handleNextPage}>Siguiente</button>{' '}
        </>
      )}
    </div>
  );
};
