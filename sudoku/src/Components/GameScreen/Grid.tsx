import { useEffect } from 'react';
import './Grid.css'
import Puzzle from '../../GameObjects/puzzle';
import GridSquare from '../../GameObjects/square';

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

    function selectSquare(row: number, col: number) {

        if (initialPuzzle[row][col] === 0) {
            setSelectedSquare(puzzle.matrix[row][col])
        }
    }

    function getClassname(i: number, j: number) {

        return (
            "grid-square" 
            + `${selectedSquare && (i === selectedSquare.row && j ===selectedSquare.col) ? " selected" : ""}`
            + `${hintSquare && (i === hintSquare.row && j === hintSquare.col) ? " hint" : ""}`
            + `${(initialPuzzle[i][j] !== 0) ? " initial" : ""}`
            + `${j % 3 === 0 ? " third" : ""}`
        )
    }
    
    return (
        <table className='grid'>
            <tbody>
                {puzzle.numbers.map(i => {
                    return (
                    <tr className={"row" + `${i % 3 === 0 ? " third" : ""}`}>
                        {puzzle.numbers.map( j => {
                            return (
                                <td 
                                    className={getClassname(i, j)}
                                    onClick={() => selectSquare(i, j)}
                                >
                                    {(puzzle.numberAt(i, j) === 0 ? "" : puzzle.numberAt(i, j))}
                                </td>
                            )
                        })}
                    </tr>
                )})}
            </tbody>          
        </table>
    )
}