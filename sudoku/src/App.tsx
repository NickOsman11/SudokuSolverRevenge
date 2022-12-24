import { useState } from 'react'
import './App.css'
import NewGameScreen from './Components/NewGameScreen/NewGameScreen'
import GridSquare from './GameObjects/square'
import Puzzle from './GameObjects/puzzle'
import puzzles from './assets/puzzles'
import GameScreen from './Components/GameScreen/GameScreen'

function App() {

    const [initialPuzzle, setInitialPuzzle] = useState<number[][]>();
    const [puzzle, setPuzzle]= useState<Puzzle>();
    const [selectedSquare, setSelectedSquare] = useState<GridSquare>( {
        row: -1,
        col: -1,
        value: 0,
        triedNumbers: [],
    } );
    const [hintSquare, setHintSquare] = useState<GridSquare>( {
        row: -1,
        col: -1,
        value: 0,
        triedNumbers: [],
    } );

    function newGame(easyMode: boolean) {
        
        let startingPuzzle = puzzles.RawSudoku[0]
        // const randomNumber = Math.floor(Math.random()*puzzles.RawSudoku.length)
        // let startingPuzzle = puzzles.RawSudoku[randomNumber]
        const newPuzzle = new Puzzle(easyMode, startingPuzzle)
        setInitialPuzzle(startingPuzzle);
        setPuzzle(newPuzzle);
    }


    if (initialPuzzle === undefined) {
        return (
            <NewGameScreen
                newGame={newGame}
            />)
    }

    if (initialPuzzle && puzzle) {
        return (
            <GameScreen
                initialPuzzle={initialPuzzle}
                puzzle={puzzle}
                setPuzzle={setPuzzle}
                selectedSquare={selectedSquare}
                setSelectedSquare={setSelectedSquare}
                hintSquare={hintSquare}
                setHintSquare={setHintSquare}
            />
        )
    }
}

export default App
