import './Grid.css'

export default function Grid(
    {matrix,
    setMatrix, 
    numbers,
    selectedSquare,
    setSelectedSquare}:
    {matrix: number[][], 
    setMatrix: React.Dispatch<React.SetStateAction<number[][]>>,
    numbers: number[],
    selectedSquare: number[],
    setSelectedSquare:React.Dispatch<React.SetStateAction<number[]>>}
    ): JSX.Element{

    function changeNumber(oldMatrix: number[][], ){

    }

    return <>
        <table className='grid'>
            <tbody>
                {numbers.map( (row) => {
                    return <tr className='row'>
                        {numbers.map( (col) => {
                        return (
                            <button 
                                className={
                                    (selectedSquare[0] === row && selectedSquare[1] === col) ?
                                    "grid-square selected" : "grid-square"}
                                onClick={() => setSelectedSquare([row, col])}
                            >{matrix[row][col] === 0 ? 0 : matrix[row][col]}
                            </button>
                        )
                    })}
                    </tr>
                })}
            </tbody>          
        </table>
    </>
}