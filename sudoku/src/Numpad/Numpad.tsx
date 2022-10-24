import Puzzle from '../Puzzle/puzzle';
import GridSquare from '../Puzzle/square';
import './Numpad.css'

interface NumpadProps {
    selectedSquareValue: number,
    puzzle: Puzzle,
    updatePuzzle: (newValue: number) => void,
}

export default function Numpad(
    {selectedSquareValue,
    puzzle,
    updatePuzzle
    }: NumpadProps): JSX.Element{

    return(
        <div className="numpad">
            {puzzle.numbers.map(n => {
                return (
                    <button 
                        className={`numpad-square`
                        + `${(selectedSquareValue === n+1 ? " selected" : "")}`}
                        onClick={() => updatePuzzle(n+1)}>
                        {n + 1}
                    </button>
                )
            })}
        </div>
    )
}