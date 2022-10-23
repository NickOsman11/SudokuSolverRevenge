import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import puzzles from './assets/puzzles'
import Grid from './Grid/Grid'
import Numpad from './Numpad/Numpad'
import NewGameScreen from './NewGameScreen/NewGameScreen'

export interface GridSquare {
    coordinates: number[]; //[row, column]
    value: number;
    eliminatedNumbers: number[]
}

function App() {
    const easyMode: boolean = false
    const gridSize = 9
    const numbers: number[] = []

    for (let i = 0; i<gridSize; i++) {
        numbers.push(i)
    }

    const [initialPuzzle, setInitialPuzzle] = useState<number[][]>();
    const [puzzle, setPuzzle]= useState<GridSquare[][]>();
    const [selectedSquare, setSelectedSquare] = useState<GridSquare>({
        coordinates: [-1, -1],
        value: 0,
        eliminatedNumbers: [],
    });

    function newGame(){

        const randomNumber = Math.floor(Math.random()*puzzles.RawSudoku.length)
        const startingPuzzle = puzzles.RawSudoku[randomNumber]
        
        const newPuzzle: GridSquare[][] = numbers.map(row => {
            return numbers.map(col => {
                return {
                    coordinates: [row, col],
                    value: startingPuzzle[row][col],
                    eliminatedNumbers: [],
                }
            })
        })
        console.log(newPuzzle);
        setInitialPuzzle(startingPuzzle);
        setPuzzle(newPuzzle);
    }

    function updatePuzzle(newValue: number) {
        if (puzzle === undefined) {
            return
        }
        const updatedPuzzle = puzzle.map(row => row.map(square => square))
        const [row, col] = selectedSquare.coordinates;

        if (newValue === selectedSquare.value) {
            updatedPuzzle[row][col].value = 0;
        }
        else {
            updatedPuzzle[row][col].value = newValue;
        }
        setSelectedSquare(updatedPuzzle[row][col]);
        setPuzzle(updatedPuzzle);
    }
    
    function selectSquare(row: number, col: number) {
        if (initialPuzzle && puzzle && initialPuzzle[row][col] === 0) {
            setSelectedSquare(puzzle[row][col])
        }
    }

    if (initialPuzzle === undefined ) {
        return (<NewGameScreen
            newGame={newGame}
            easyMode={easyMode}
        />)
    }

    if (initialPuzzle && puzzle) {
        return (
            <main className="puzzle-area">
                <Grid 
                    initialPuzzle={initialPuzzle}
                    puzzle={puzzle}
                    numbers={numbers}
                    selectedSquare={selectedSquare}
                    selectSquare={selectSquare}
                />
                <Numpad 
                    numbers={numbers}
                    selectedSquareValue={selectedSquare.value}
                    setValue={updatePuzzle}
                />
            </main>
        )
    }
}

export default App
