import './Chessboard.css';
import {horizontalAxis, verticalAxis} from '../../constants/axis'
import { generateBoardGrid, setInitialPiecesPositions } from '../../utils/boardGeneration';
import { grabPiece, movePiece, releasePiece } from '../../utils/gameplay';
import { useRef, useState } from 'react';
import { Piece } from '../../interfaces/interfaces';
import Referee from '../../utils/referee'


export default function Chessboard() {
  const [activePiece, setActicePiece] = useState<HTMLInputElement | null>(null) 
  const [activeX, setActiveX] = useState(0)
  const [activeY, setActiveY] = useState(0)
  const [pieces, setPieces] = useState<Piece[]>(setInitialPiecesPositions())
  const board = generateBoardGrid(verticalAxis, horizontalAxis, pieces)
  const chessboardRef = useRef<HTMLDivElement>(null)
  const referee = new Referee()
  return (
    <div 
        ref={chessboardRef} 
        onMouseDown={(e) => grabPiece(e, activePiece, setActicePiece, chessboardRef, setActiveX, setActiveY)} 
        onMouseMove={(e) => movePiece(e, activePiece, chessboardRef)} 
        onMouseUp={(e) => releasePiece(e, activePiece, setActicePiece, setPieces, chessboardRef, activeX, activeY, referee)}  
        id="chessboard" 
        className='chessboard__board'>
          {pieces && board}
    </div>
  )
}
