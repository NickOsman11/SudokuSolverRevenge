import Puzzle from '../../GameObjects/puzzle';
import GridSquare from '../../GameObjects/square';
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
                const classname = "numpad-square" + `${(selectedSquare.value === n+1 ? " selected" : "")}`
                const numberToDisplay = selectedSquare.triedNumbers.includes(n + 1) ? "" : `${n + 1}`
                return (
                    <button 
                        className={classname}
                        onClick={() => makeMove(n+1)}
                    >
                        {numberToDisplay}
                    </button>
                )
            })}
        </div>
    )
}