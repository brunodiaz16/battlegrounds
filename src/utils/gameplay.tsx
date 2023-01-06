let activePiece: HTMLElement | null = null

export function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const element = e.target as HTMLElement;
    if(element.classList.contains('ChessTile__tile_piece')){
        console.log("grabbing", e.target)

        const x = e.clientX - 50
        const y = e.clientY - 50
        element.style.position = 'absolute'
        element.style.left = `${x}px`
        element.style.top = `${y}px`

        activePiece = element

    }

}

export function movePiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if(activePiece){
        console.log("moving", e.target)

        const x = e.clientX - 50
        const y = e.clientY - 50
        activePiece.style.position = 'absolute'
        activePiece.style.left = `${x}px`
        activePiece.style.top = `${y}px`

    }

}

export function releasePiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if(activePiece){
        console.log("release", e.target)
        activePiece = null

    }

}
