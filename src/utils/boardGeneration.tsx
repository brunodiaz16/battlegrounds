import Chessblock from '../components/ChessTile/ChessTile';

export const generateBoardGrid = (verticalAxis:Array<string>, horizontalAxis:Array<string>) => {
    let board = []

    for(let j = verticalAxis.length-1;j>=0; j--){
      for(let i = 0;i<horizontalAxis.length; i++) {
        let isOdd = (i+j)%2!==0
        board.push(<Chessblock number={horizontalAxis[i]} letter={verticalAxis[j]} isWhite={isOdd} />)
      }
    }
    return board
}