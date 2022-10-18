import { useState } from 'react'
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

    const [selectedSquare, setSelectedSquare] = useState([-1, -1])
    const [matrix, setMatrix] = useState(puzzles.RawSudoku[0])


    return (
        <div className="puzzle-area">
            <Grid 
                matrix={matrix}
                setMatrix={setMatrix}
                numbers={numbers}
                selectedSquare={selectedSquare}
                setSelectedSquare={setSelectedSquare}/>
            <Numpad numbers={numbers} />
        </div>
    )
}

export default App
