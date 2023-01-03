import React from 'react'
import './ChessTile.css'

interface IChessTile {
    letter: string;
    number: string;
    isWhite: boolean;
}


export default function ChessTile({letter, number, isWhite}:IChessTile) {

  return (
    <span className={`ChessTile__tile_${isWhite ? 'w' : 'b'}`}>[{letter}{number}]</span>
  )
}
