import React from 'react';

export const GameItem = ({ game }) => {
  return (
    <li>
      {game.title}
      {game.completed ? ' (Completado)' : ' (Pendiente)'}
    </li>
  );
};
