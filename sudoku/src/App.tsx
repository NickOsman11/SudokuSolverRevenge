import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import puzzles from './assets/puzzles'
import Grid from './Grid/Grid'
import Numpad from './Numpad/Numpad'

// interface SelectedSquare {
//     row: number;
//     col: number;
//     value: number
// }

function App() {
    const gridSize = 9
    const numbers: number[] = []

    for (let i = 0; i<gridSize; i++) {
        numbers.push(i)
    }

    const randomNumber = Math.floor(Math.random()*puzzles.RawSudoku.length)

    const [initialPuzzle, setInitialPuzzle] = useState<number[][]>(puzzles.RawSudoku[randomNumber])
    const [selectedSquare, setSelectedSquare] = useState([-1,-1])
    const [selectedSquareValue, setSelectedSquareValue] = useState(0)
    const [matrix, setMatrix]= useState<number[][]>(puzzles.RawSudoku[randomNumber])

    // function newGame(){
    //     const randomNumber = Math.floor(Math.random()*puzzles.RawSudoku.length)
    //     setInitialPuzzle(puzzles.RawSudoku[randomNumber]);
    //     console.log(initialPuzzle)
    //     setMatrix(initialPuzzle)
    //     console.log(matrix)
    // }

    function updateGrid(newValue: number) {
        if (matrix !== undefined) {
            const newMatrix = matrix.map(row => row.map(square => square))
            const [row, col] = selectedSquare;

            if (newValue === selectedSquareValue) {
                newMatrix[row][col] = 0;
                setSelectedSquareValue(0);
            }
            else {
                newMatrix[row][col] = newValue;
                setSelectedSquareValue(newMatrix[row][col]);
            }
            setMatrix(newMatrix);
        }
    }

    function selectSquare(row: number, col: number) {
        if (initialPuzzle && initialPuzzle[row][col] === 0) {
            setSelectedSquareValue(matrix[row][col])
            setSelectedSquare([row, col])
        }
    }

    if (initialPuzzle !== undefined && matrix !== undefined) {
        return (
            <main className="puzzle-area">
                <Grid 
                initialMatrix={initialPuzzle}
                matrix={matrix}
                numbers={numbers}
                selectedSquare={selectedSquare}
                selectSquare={selectSquare}
                />
                <Numpad 
                numbers={numbers}
                selectedSquareValue={selectedSquareValue}
                setValue={updateGrid}
                />
            </main>
        )
    }
}


export default App
