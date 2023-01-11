import ChessTile from '../components/ChessTile/ChessTile';
import { BishopB, BishopW, KingB, KingW, KnightB, KnightW, PawnB, PawnW, QueenB, QueenW, TowerB, TowerW } from '../assets/images/index';
import { Piece } from '../interfaces';





export function setInitialPiecesPositions() {
  const pieces: Piece[]  = [];

  // Pawns
  for(let i = 0; i < 8; i++) {
    pieces.push({x: i, y: 6, image:PawnB})
    pieces.push({x: i, y: 1, image:PawnW})
  }
  
  //Towers
  pieces.push({x: 0, y: 7, image:TowerB}, {x: 7, y: 7, image:TowerB}, {x: 0, y: 0, image:TowerW}, {x: 7, y: 0, image:TowerW});
  
  //Knights
  pieces.push({x: 1, y: 7, image:KnightB}, {x: 6, y: 7, image:KnightB}, {x: 1, y: 0, image:KnightW}, {x: 6, y: 0, image:KnightW});
  
  //Bishops
  pieces.push({x: 2, y: 7, image:BishopB}, {x: 5, y: 7, image:BishopB}, {x: 2, y: 0, image:BishopW}, {x: 5, y: 0, image:BishopW});
  
  //Queens and Kings
  pieces.push({x: 3, y: 7, image:QueenB}, {x: 3, y: 0, image:QueenW}, {x: 4, y: 7, image:KingB}, {x: 4, y: 0, image:KingW});
  
  return pieces
}


export const generateBoardGrid = (verticalAxis:Array<string>, horizontalAxis:Array<string>, pieces:Array<Piece>) => {
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
        board.push(<ChessTile key={`${j}${i}`} imagePiece={image} isWhite={isOdd} />)
      }
    }
    return board
}