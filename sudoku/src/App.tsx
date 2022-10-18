import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import puzzles from './assets/puzzles'
import Grid from './Grid/Grid'

function App() {
    const gridSize = 9
    const numbers: number[] = []

    for (let i = 0; i<gridSize; i++){
        numbers.push(i)
    }

    const puzzle = puzzles.RawSudoku[0]

    return (
        <div className="App">
            <Grid matrix={puzzle} numbers={numbers}/>
        </div>
    )
}

export default App
