import ChessTile from '../components/ChessTile/ChessTile';
import { BishopB, BishopW, KingB, KingW, KnightB, KnightW, PawnB, PawnW, QueenB, QueenW, TowerB, TowerW } from '../assets/images/index';
import { horizontalAxis } from '../constants/axis';

interface Piece {
    image: string
    x: number
    y: number
  
}

const pieces: Piece[]  = [];

function setInitialPiecesPositions() {
  //Pawns
  for(let i = 0; i< horizontalAxis.length;i++){
    pieces.push({x: i, y: 6, image:PawnB})
    pieces.push({x: i, y: 1, image:PawnW})
  }
  //Towers
  pieces.push({x: 0, y: 7, image:TowerB})
  pieces.push({x: 0, y: 0, image:TowerW})
  pieces.push({x: 7, y: 7, image:TowerB})
  pieces.push({x: 7, y: 0, image:TowerW})
  //Knights
  pieces.push({x: 1, y: 7, image:KnightB})
  pieces.push({x: 1, y: 0, image:KnightW})
  pieces.push({x: 6, y: 7, image:KnightB})
  pieces.push({x: 6, y: 0, image:KnightW})
  //Bishops
  pieces.push({x: 2, y: 7, image:BishopB})
  pieces.push({x: 2, y: 0, image:BishopW})
  pieces.push({x: 5, y: 7, image:BishopB})
  pieces.push({x: 5, y: 0, image:BishopW})
  //Queens
  pieces.push({x: 3, y: 7, image:QueenB})
  pieces.push({x: 3, y: 0, image:QueenW})
  //Kings
  pieces.push({x: 4, y: 7, image:KingB})
  pieces.push({x: 4, y: 0, image:KingW})
 

}
pieces.push({image: PawnB, x: 0, y:6})

export const generateBoardGrid = (verticalAxis:Array<string>, horizontalAxis:Array<string>) => {
    let board = []
    setInitialPiecesPositions()
    for(let j = verticalAxis.length-1;j>=0; j--){
      for(let i = 0;i<horizontalAxis.length; i++) {
        let isOdd = (i+j)%2!==0
        let image = null
        pieces.forEach(piece => {
          if(piece.x === i && piece.y === j)
            image = piece.image
        })
        board.push(<ChessTile key={`${j}${i}`} number={horizontalAxis[i]} imagePiece={image} isWhite={isOdd} />)
      }
    }
    return board
}