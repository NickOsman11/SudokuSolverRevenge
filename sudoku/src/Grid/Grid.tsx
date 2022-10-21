import { useEffect } from 'react';
import './Grid.css'

interface GridProps {
    matrix: number[][], 
    numbers: number[],
    selectedSquare?: number[],
    selectSquare: (row: number, col: number) => void,
}

export default function Grid(
    {matrix,
    numbers,
    selectedSquare,
    selectSquare}: GridProps
    ): JSX.Element{

    return (
        <table className='grid'>
            <tbody>
                {numbers.map( (row) => {
                    return <tr className='row'>
                        {numbers.map( (col) => {
                        return (
                            <button 
                                className={
                                    (selectedSquare && (selectedSquare[0] === row && selectedSquare[1] === col)) ?
                                    "grid-square selected" : "grid-square"}
                                onClick={() => selectSquare(row, col)}
                            >{matrix[row][col] === 0 ? 0 : matrix[row][col]}</button>
                        )
                    })}
                    </tr>
                })}
            </tbody>          
        </table>
    )
}