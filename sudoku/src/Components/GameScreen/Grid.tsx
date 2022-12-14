import { useEffect } from 'react';
import './Grid.scss'
import Puzzle from '../../GameObjects/puzzle';
import GridSquare from '../../GameObjects/square';
import { InitialPuzzle } from './Settings';

interface GridProps {
    initialPuzzle: InitialPuzzle;
    puzzle: Puzzle;
    selectedSquare?: GridSquare;
    setSelectedSquare: (square: GridSquare) => void;
    hintSquare?: GridSquare;
    easyMode: boolean;
}

export default function Grid(props: GridProps): JSX.Element{

    function selectSquare(row: number, col: number) {
        if (props.initialPuzzle.rawMatrix[row][col] === 0) {
            props.setSelectedSquare(props.puzzle.matrix[row][col])
        }
    }

    function getClassname(i: number, j: number) { 
        return (
            "grid-square" 
            + `${props.selectedSquare && (i === props.selectedSquare.row && j === props.selectedSquare.col) ? " selected" : ""}`
            + `${props.hintSquare && (i === props.hintSquare.row && j === props.hintSquare.col) ? " hint" : ""}`
            + `${(props.initialPuzzle.rawMatrix[i][j] !== 0) ? " initial" : ""}`
            + `${j % 3 === 0 ? " third-column" : ""}`
        )
    }
    
    return (
        <table className='grid'>
            <tbody>
                {props.puzzle.numbers.map(i => {
                    return (
                    <tr 
                        key={i}
                        className={"row" + `${i % 3 === 0 ? " third-row" : ""}`}
                    >   
                        {props.puzzle.numbers.map( j => {
                            return (
                                <td 
                                    key={j}
                                    className={getClassname(i, j)}
                                    onClick={() => selectSquare(i, j)}
                                >
                                    {(props.puzzle.numberAt(i, j) === 0 ? "" : props.puzzle.numberAt(i, j))}
                                </td>
                            )
                        })}
                    </tr>
                )})}
            </tbody>          
        </table>
    )
}