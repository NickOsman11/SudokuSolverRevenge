import { useState } from 'react'
import './App.scss'
import NewGameScreen from './Components/NewGameScreen/NewGameScreen'
import Puzzle from './GameObjects/puzzle'
import GameScreen from './Components/GameScreen/GameScreen'

function App() {

    const [initialPuzzle, setInitialPuzzle] = useState<number[][]>();
    const [puzzle, setPuzzle]= useState<Puzzle>();
    const [easyMode, setEasyMode] = useState(false)

    if (initialPuzzle === undefined) {
        return (
            <NewGameScreen
                setInitialPuzzle={setInitialPuzzle}
                setPuzzle={setPuzzle}
                easyMode={easyMode}
                setEasyMode={setEasyMode}
            />)
    }

    if (initialPuzzle && puzzle) {
        return (
            <GameScreen
                initialPuzzle={initialPuzzle}
                puzzle={puzzle}
                setPuzzle={setPuzzle}
                easyMode={easyMode}
            />
        )
    }
}

export default App
