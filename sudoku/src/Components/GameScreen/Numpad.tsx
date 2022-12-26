import puzzles from '../../assets/puzzles';
import HintHelper from '../../GameObjects/hintHelper';
import Puzzle from '../../GameObjects/puzzle';
import GridSquare from '../../GameObjects/square';
import './Numpad.scss'

interface NumpadProps {
    selectedSquare?: GridSquare;
    puzzle: Puzzle;
    makeMove: (newValue: number) => void;
    easyMode: boolean;
    hintHelper: HintHelper;
}

export default function Numpad(props: NumpadProps): JSX.Element{

    const square = props.selectedSquare

    function checkIfNumberShouldDisplay(n: number) {
        return (square && (
            //numbers should display if easy mode turned off
            !props.easyMode
            //should display if it represents the selected square
            || (square.value === n + 1)
            //should display if it isn't an eliminated number
            || !props.hintHelper.checkIfNumberEliminated(square.row, square.col, n + 1)
        ))        
    }

    return(
        <div className="numpad">
            {props.puzzle.numbers.map(n => {
                const square = props.selectedSquare
                const classname = "numpad-square" + `${(square && (square.value === n + 1) ? " selected" : "")}`

                return (
                    <button 
                        key={n}
                        className={classname}
                        onClick={() => props.makeMove(n+1)}
                    >
                        {checkIfNumberShouldDisplay(n) ? `${n+1}` : ""}
                    </button>
                )
            })}
        </div>
    )
}