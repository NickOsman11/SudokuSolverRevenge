import { useState } from 'react'
import './App.scss'
import Puzzle from './GameObjects/puzzle'
import GameScreen from './Components/GameScreen/GameScreen'
import { InitialPuzzle } from './Components/GameScreen/Settings';
import puzzles from './assets/puzzles';
import Square from './GameObjects/square';

function App() {

    return (
        <GameScreen />
    )
}

export default App
