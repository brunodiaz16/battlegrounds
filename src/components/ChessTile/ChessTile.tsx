import React from 'react'
import './ChessTile.css'


interface IChessTileProps {
    imagePiece?: string | null;
    isWhite: boolean;
}


export default function ChessTile({imagePiece, isWhite}:IChessTileProps) {
  return (
    <div className={`ChessTile__tile_${isWhite ? 'w' : 'b'}`}>{imagePiece && <div className='ChessTile__tile_piece' style={{backgroundImage: `url(${imagePiece})`}} ></div>}</div>
  )
}
