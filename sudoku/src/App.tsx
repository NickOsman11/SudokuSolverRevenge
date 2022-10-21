import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import puzzles from './assets/puzzles'
import Grid from './Grid/Grid'
import Numpad from './Numpad/Numpad'

function App() {
    const gridSize = 9
    const numbers: number[] = []

    for (let i = 0; i<gridSize; i++){
        numbers.push(i)
    }

    const initialPuzzle = puzzles.RawSudoku[0]
    const [selectedSquare, setSelectedSquare] = useState([-1,-1])
    const [matrix, setMatrix]= useState(initialPuzzle)

    function updateGrid(newValue: number){
        const newMatrix = [...matrix];
        const [row, col] = selectedSquare;
        newMatrix[row][col] = newValue;
        setMatrix(newMatrix);
    }

    function selectSquare(row: number, col: number){
        setSelectedSquare([row, col])
    }

    return (
        <div className="puzzle-area">
            <Grid 
                matrix={matrix}
                numbers={numbers}
                selectedSquare={selectedSquare}
                selectSquare={selectSquare}
                />
            <Numpad 
                numbers={numbers}
                setNewValue={updateGrid}
                 />
        </div>
    )
}

export default App
