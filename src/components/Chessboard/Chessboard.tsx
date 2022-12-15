import './Chessboard.css';
import {horizontalAxis, verticalAxis} from '../../constants/axis'
import { generateBoardGrid } from '../../utils/boardGeneration';


export default function Chessboard() {
  const board = generateBoardGrid(verticalAxis, horizontalAxis)
  return (
    <div id="chessboard" className='chessboard__board'>
        {board}
    </div>
  )
}
