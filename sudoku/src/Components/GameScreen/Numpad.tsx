import Puzzle from '../../GameObjects/puzzle';
import GridSquare from '../../GameObjects/square';
import './Numpad.scss'

interface NumpadProps {
    selectedSquare: GridSquare;
    puzzle: Puzzle;
    makeMove: (newValue: number) => void;
    easyMode: boolean;
}

export default function Numpad(props: NumpadProps): JSX.Element{

    return(
        <div className="numpad">
            {props.puzzle.numbers.map(n => {
                const classname = "numpad-square" + `${(props.selectedSquare.value === n + 1 ? " selected" : "")}`
                const numberToDisplay = (props.easyMode && props.selectedSquare.triedNumbers.includes(n + 1)) ? "" : `${n + 1}`

                return (
                    <button 
                        className={classname}
                        onClick={() => props.makeMove(n+1)}
                    >
                        {numberToDisplay}
                    </button>
                )
            })}
        </div>
    )
}