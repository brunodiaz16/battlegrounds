import ChessTile from '../components/ChessTile/ChessTile';
import { BishopB, BishopW, KingB, KingW, KnightB, KnightW, PawnB, PawnW, QueenB, QueenW, TowerB, TowerW } from '../assets/images/index';
import { Piece } from '../interfaces/interfaces';
import { PieceType, TeamType } from '../interfaces/enums';







export function setInitialPiecesPositions() {
  const pieces: Piece[]  = [];

  // Pawns
  for(let i = 0; i < 8; i++) {
    pieces.push({x: i, y: 6, image:PawnB, type: PieceType.PAWN, team: TeamType.OPPONENT})
    pieces.push({x: i, y: 1, image:PawnW, type: PieceType.PAWN, team: TeamType.OUR})
  }
  
  //Towers
  pieces.push({x: 0, y: 7, image:TowerB, type: PieceType.ROOK, team: TeamType.OPPONENT}, {x: 7, y: 7, image:TowerB, type: PieceType.ROOK, team: TeamType.OPPONENT}, {x: 0, y: 0, image:TowerW, type: PieceType.ROOK, team: TeamType.OUR}, {x: 7, y: 0, image:TowerW, type: PieceType.ROOK, team: TeamType.OUR});
  
  //Knights
  pieces.push({x: 1, y: 7, image:KnightB, type: PieceType.KNIGHT, team: TeamType.OPPONENT}, {x: 6, y: 7, image:KnightB, type: PieceType.KNIGHT, team: TeamType.OPPONENT}, {x: 1, y: 0, image:KnightW, type: PieceType.KNIGHT, team: TeamType.OUR}, {x: 6, y: 0, image:KnightW, type: PieceType.KNIGHT, team: TeamType.OUR});
  
  //Bishops
  pieces.push({x: 2, y: 7, image:BishopB, type: PieceType.BISHOP, team: TeamType.OPPONENT}, {x: 5, y: 7, image:BishopB, type: PieceType.BISHOP, team: TeamType.OPPONENT}, {x: 2, y: 0, image:BishopW, type: PieceType.BISHOP, team: TeamType.OUR}, {x: 5, y: 0, image:BishopW, type: PieceType.BISHOP, team: TeamType.OUR});
  
  //Queens and Kings
  pieces.push({x: 3, y: 7, image:QueenB, type: PieceType.QUEEN, team: TeamType.OPPONENT}, {x: 3, y: 0, image:QueenW, type: PieceType.QUEEN, team: TeamType.OUR}, {x: 4, y: 7, image:KingB, type: PieceType.KING, team: TeamType.OPPONENT}, {x: 4, y: 0, image:KingW, type: PieceType.KING, team: TeamType.OUR});
  
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