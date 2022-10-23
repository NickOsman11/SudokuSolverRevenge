import { useEffect } from 'react';
import './Grid.css'
import { GridSquare } from '../App'

interface GridProps {
    initialPuzzle: number[][];
    puzzle: GridSquare[][];
    numbers: number[];
    selectedSquare?: GridSquare;
    selectSquare: (row: number, col: number) => void;
}

export default function Grid(
    {initialPuzzle,
    puzzle,
    numbers,
    selectedSquare,
    selectSquare}: GridProps
    ): JSX.Element{
    
    return (
        <table className='grid'>
            <tbody>
                {numbers.map( (row) => {
                    return <tr className={'row' + `${row % 3 === 0 ? " third" : ""}`}>
                        {numbers.map( (col) => {
                        return (
                            <td 
                                className=
                                    {`grid-square` 
                                    + `${selectedSquare && (row === selectedSquare.coordinates[0] && selectedSquare.coordinates[1] === col) ? " selected" : ""}`
                                    + `${(initialPuzzle[row][col] !== 0) ? " initial" : ""}`
                                    + `${col % 3 === 0 ? " third" : ""}`}
                                onClick={() => selectSquare(row, col)}
                            >{(puzzle[row][col].value === 0 ? "" : puzzle[row][col].value)}</td>
                        )
                    })}
                    </tr>
                })}
            </tbody>          
        </table>
    )
}