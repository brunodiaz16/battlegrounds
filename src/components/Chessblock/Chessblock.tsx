import React from 'react'
import './Chessblock.css'

interface IChessblock {
    letter: string;
    number: string;
    isWhite: boolean;
}


export default function Chessblock({letter, number, isWhite}:IChessblock) {

  return (
    <span className={`Chessblock__tile_${isWhite ? 'w' : 'b'}`}>[{letter}{number}]</span>
  )
}
