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
    }: GridProps
    ): JSX.Element{

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
                {puzzle.numbers.map(i => {
                    return <tr className={'row' + `${i % 3 === 0 ? " third" : ""}`}>
                        {puzzle.numbers.map( j => {
                        return (
                            <td 
                                className=
                                    {`grid-square` 
                                    + `${selectedSquare && (i === selectedSquare.row && j ===selectedSquare.col) ? " selected" : ""}`
                                    + `${hintSquare && (i === hintSquare.row && j === hintSquare.col) ? " hint" : ""}`
                                    + `${(initialPuzzle[i][j] !== 0) ? " initial" : ""}`
                                    + `${j % 3 === 0 ? " third" : ""}`}
                                onClick={() => selectSquare(i, j)}
                            >{(puzzle.numberAt(i, j) === 0 ? "" : puzzle.numberAt(i, j))}</td>
                        )
                    })}
                    </tr>
                })}
            </tbody>          
        </table>
    )
}