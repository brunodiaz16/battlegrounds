import './Chessboard.css';
import {horizontalAxis, verticalAxis} from '../../constants/axis'
import { generateBoardGrid } from '../../utils/boardGeneration';
import { grabPiece, movePiece, releasePiece } from '../../utils/gameplay';


export default function Chessboard() {
  const board = generateBoardGrid(verticalAxis, horizontalAxis)
  return (
    <div onMouseDown={(e) => grabPiece(e)} onMouseMove={(e) => movePiece(e)} onMouseUp={(e) => releasePiece(e)}  id="chessboard" className='chessboard__board'>
        {board}
    </div>
  )
}
