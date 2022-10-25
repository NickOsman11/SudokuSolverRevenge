import { useState } from 'react'
import './App.css'
import Grid from './Grid/Grid'
import Numpad from './Numpad/Numpad'
import NewGameScreen from './NewGameScreen/NewGameScreen'
import GridSquare from './Puzzle/square'
import Puzzle from './Puzzle/puzzle'
import puzzles from './assets/puzzles'
import HintHelper from './Puzzle/hintHelper'

function App() {

    const [initialPuzzle, setInitialPuzzle] = useState<number[][]>();
    const [puzzle, setPuzzle]= useState<Puzzle>();
    const [selectedSquare, setSelectedSquare] = useState<GridSquare>({
        i: -1,
        j: -1,
        value: 0,
        eliminatedNumbers: [],
        triedNumbers: [],
    });

    function newGame(easyMode: boolean) {
        
        // const randomNumber = Math.floor(Math.random()*puzzles.RawSudoku.length)
        // let startingPuzzle = puzzles.RawSudoku[randomNumber]
        let startingPuzzle = puzzles.RawSudoku[0]
        const newPuzzle = new Puzzle(easyMode, startingPuzzle)
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
                if (!puzzle.checkIfLegalMove(row, col, newValue)) {
                    updatedPuzzle.addTriedNumber(row, col, newValue)
                }
                else if (HintHelper.checkIfNumberIsDetermined(row, col, puzzle, newValue)) {
                    console.log("determined")
                    updatedPuzzle.setNumber(row, col, newValue)
                }
                else {
                    console.log("legal but undetermined")
                }
                setSelectedSquare(updatedPuzzle.matrix[row][col])
                setPuzzle(updatedPuzzle)

            }
            else {
                if (puzzle.matrix[row][col].value === newValue) {
                    updatedPuzzle.setNumber(row, col, 0)
                }
                else {
                    puzzle.setNumber(row, col, newValue)
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
                    selectedSquare={selectedSquare}
                    puzzle={puzzle}
                    updatePuzzle={updatePuzzle}
                />
            </main>
        )
    }
}

export default App
