import React from 'react';

export const GameItem = ({ game }) => {
  //console.log(game);
  return (
    <li>
      {game}
      {game.completed ? ' (Completado)' : ' (Pendiente)'}
    </li>
  );
};
