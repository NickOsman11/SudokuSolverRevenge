export default function Grid({matrix, numbers}: {matrix: number[][], numbers: number[]}): JSX.Element{
    return <>
        <table>
            <tbody>
                {numbers.map( (row) => {
                    return <tr>
                        {numbers.map( (col) => {
                        return <input 
                            className="grid-square"
                            value={matrix[row][col] === 0 ? "" : matrix[row][col]}
                                >
                            </input>
                    })}
                    </tr>
                })}
            </tbody>          
        </table>
    </>
}