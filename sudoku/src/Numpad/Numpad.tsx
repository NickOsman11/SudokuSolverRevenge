import Puzzle from '../Puzzle/puzzle';
import GridSquare from '../Puzzle/square';
import './Numpad.css'

interface NumpadProps {
    selectedSquare: GridSquare,
    puzzle: Puzzle,
    makeMove: (newValue: number) => void,
}

export default function Numpad(
    {selectedSquare,
    puzzle,
    makeMove
    }: NumpadProps): JSX.Element{

    return(
        <div className="numpad">
            {puzzle.numbers.map(n => {
                return (
                    <button 
                        className={`numpad-square`
                        + `${(selectedSquare.value === n+1 ? " selected" : "")}`}
                        onClick={() => makeMove(n+1)}>
                        {selectedSquare.triedNumbers.includes(n + 1) ? "" : `${n + 1}`}
                    </button>
                )
            })}
        </div>
    )
}