import { useState } from 'react'
import './App.css'
import Grid from './Grid/Grid'
import Numpad from './Numpad/Numpad'
import NewGameScreen from './NewGameScreen/NewGameScreen'
import GridSquare from './Puzzle/square'
import Puzzle from './Puzzle/puzzle'
import puzzles from './assets/puzzles'

function App() {

    const [initialPuzzle, setInitialPuzzle] = useState<number[][]>();
    const [puzzle, setPuzzle]= useState<Puzzle>();
    const [selectedSquare, setSelectedSquare] = useState<GridSquare>({
        i: -1,
        j: -1,
        value: 0,
        eliminatedNumbers: [],
    });

    function newGame() {
        
        const randomNumber = Math.floor(Math.random()*puzzles.RawSudoku.length)
        let startingPuzzle = puzzles.RawSudoku[randomNumber]
        const newPuzzle = new Puzzle(false, startingPuzzle)
        setInitialPuzzle(startingPuzzle);
        setPuzzle(newPuzzle);
    }

    function updatePuzzle(
        newValue: number,
    ) {
        if (puzzle) {
            const [row, col] = [selectedSquare.i, selectedSquare.j]
            let copyOfCurrentMatrix = puzzle.matrix.map(row => {return row.map(col => {return col})})
            let updatedPuzzle = new Puzzle(puzzle.easyMode, undefined, copyOfCurrentMatrix)
            if (puzzle.easyMode) {
                //TODO: check that the move is valid!
            }
            else {
                if (updatedPuzzle.matrix[row][col].value === newValue) {
                    updatedPuzzle.setNumber(row, col, 0)
                }
                else {
                    updatedPuzzle.setNumber(row, col, newValue)
                }
                setSelectedSquare(updatedPuzzle.matrix[row][col])
                setPuzzle(updatedPuzzle)
            }
        }
    }

    if (initialPuzzle === undefined) {
        return (<NewGameScreen
            newGame={newGame}
        />)
    }

    if (initialPuzzle && puzzle) {
        return (
            <main className="puzzle-area">
                <Grid 
                    initialPuzzle={initialPuzzle}
                    puzzle={puzzle}
                    selectedSquare={selectedSquare}
                    setSelectedSquare={setSelectedSquare}
                />
                <Numpad 
                    selectedSquareValue={selectedSquare.value}
                    puzzle={puzzle}
                    updatePuzzle={updatePuzzle}
                />
            </main>
        )
    }
}

export default App
