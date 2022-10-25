import { useEffect } from 'react';
import './Grid.css'
import Puzzle from '../Puzzle/puzzle';
import GridSquare from '../Puzzle/square';

interface GridProps {
    initialPuzzle: number[][];
    puzzle: Puzzle;
    selectedSquare?: GridSquare;
    setSelectedSquare: (square: GridSquare) => void, 
    hintSquare: GridSquare,
}

export default function Grid(
    {initialPuzzle,
    puzzle,
    selectedSquare,
    setSelectedSquare,
    hintSquare,
    }: GridProps): JSX.Element{

    function selectSquare(
        row: number,
        col: number,
        ) {
            console.log(puzzle.matrix[row][col])
            if (initialPuzzle[row][col] === 0) {
                setSelectedSquare(puzzle.matrix[row][col])
            }
    }
    
    return (
        <table className='grid'>
            <tbody>
                {puzzle.numbers.map( (row) => {
                    return <tr className={'row' + `${row % 3 === 0 ? " third" : ""}`}>
                        {puzzle.numbers.map( (col) => {
                        return (
                            <td 
                                className=
                                    {`grid-square` 
                                    + `${selectedSquare && (row === selectedSquare.i && selectedSquare.j === col) ? " selected" : ""}`
                                    + `${hintSquare && (row === hintSquare.i && hintSquare.j === col) ? " hint" : ""}`
                                    + `${(initialPuzzle[row][col] !== 0) ? " initial" : ""}`
                                    + `${col % 3 === 0 ? " third" : ""}`}
                                onClick={() => selectSquare(row, col)}
                            >{(puzzle.matrix[row][col].value === 0 ? "" : puzzle.matrix[row][col].value)}</td>
                        )
                    })}
                    </tr>
                })}
            </tbody>          
        </table>
    )
}