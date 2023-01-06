import React from 'react'
import './ChessTile.css'


interface IChessTileProps {
    imagePiece?: string | null;
    number: string;
    isWhite: boolean;
}


export default function ChessTile({imagePiece, number, isWhite}:IChessTileProps) {
  return (
    <span className={`ChessTile__tile_${isWhite ? 'w' : 'b'}`}>{imagePiece && <img className='ChessTile__tile_piece' src={`${imagePiece}`} alt='piece'/>}</span>
  )
}
