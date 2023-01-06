import React from 'react'
import './ChessTile.css'


interface IChessTileProps {
    imagePiece?: string | null;
    number: string;
    isWhite: boolean;
}


export default function ChessTile({imagePiece, number, isWhite}:IChessTileProps) {
  return (
    <div className={`ChessTile__tile_${isWhite ? 'w' : 'b'}`}>{imagePiece && <div className='ChessTile__tile_piece' style={{backgroundImage: `url(${imagePiece})`}} ></div>}</div>
  )
}
