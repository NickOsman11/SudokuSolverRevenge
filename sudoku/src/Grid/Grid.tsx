import { useEffect } from 'react';
import './Grid.css'

interface GridProps {
    initialMatrix: number[][];
    matrix: number[][];
    numbers: number[];
    selectedSquare?: number[];
    selectSquare: (row: number, col: number) => void;
}

export default function Grid(
    {initialMatrix,
    matrix,
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
                                    + `${selectedSquare && (row === selectedSquare[0] && selectedSquare[1] === col) ? " selected" : ""}`
                                    + `${(initialMatrix[row][col] !== 0) ? " initial" : ""}`
                                    + `${col % 3 === 0 ? " third" : ""}`}
                                onClick={() => selectSquare(row, col)}
                            >{(matrix[row][col] === 0 ? "" : matrix[row][col])}</td>
                        )
                    })}
                    </tr>
                })}
            </tbody>          
        </table>
    )
}