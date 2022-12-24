import Grid from "./Grid";
import Numpad from "./Numpad";
import HintHelper from "../../GameObjects/hintHelper";
import Puzzle from "../../GameObjects/puzzle";
import Square from "../../GameObjects/square";

interface GameScreenProps {
    initialPuzzle: number[][];
    puzzle: Puzzle;
    setPuzzle: (newPuzzle: Puzzle) => void;
    selectedSquare: Square;
    setSelectedSquare: (newSelectedSquare: Square) => void;
    hintSquare: Square;
    setHintSquare: (newHintSquare: Square) => void;
}

export default function GameScreen(props : GameScreenProps): JSX.Element  {

    const [row, col] = [props.selectedSquare.row, props.selectedSquare.col]
    let puzzleCopy = createCopy(props.puzzle)
    let hintHelper = new HintHelper(props.puzzle)

    function createCopy(puzzle: Puzzle){
        let copyOfCurrentMatrix = puzzle.matrix.map(i => {return i.map(j => {return j})})
        return new Puzzle(puzzle.easyMode, undefined, copyOfCurrentMatrix)
    }

    function makeMove(newValue: number) {

        if (!props.puzzle) {
            return
        }
        if (props.puzzle.easyMode) {
            updatePuzzleWithHints(newValue)
        }
        else {
            updatePuzzleWithoutHints(newValue)
        }
        props.setSelectedSquare(puzzleCopy.matrix[row][col])
        props.setPuzzle(puzzleCopy)
    }

    function updatePuzzleWithHints(newValue: number) {

        if (hintHelper.checkIfNumberEliminated(row, col, newValue)) {
            puzzleCopy.addTriedNumber(row, col, newValue)
        }
        else if (hintHelper.checkIfMoveCorrect(row, col, newValue)) {
            puzzleCopy.setNumber(row, col, newValue)
        }
    }

    function updatePuzzleWithoutHints(newValue: number) {

        if (props.puzzle.numberAt(row, col) === newValue) {
            puzzleCopy.setNumber(row, col, 0)
        }
        else {
            puzzleCopy.setNumber(row, col, newValue)
        }
    }

    return (
    <main className="puzzle-area">
        <Grid 
            initialPuzzle={props.initialPuzzle}
            puzzle={props.puzzle}
            selectedSquare={props.selectedSquare}
            setSelectedSquare={props.setSelectedSquare}
            hintSquare={props.hintSquare}
        />
        <Numpad 
            selectedSquare={props.selectedSquare}
            puzzle={props.puzzle}
            makeMove={makeMove}
        />
        {props.puzzle.easyMode ?  
        <button
            onClick={() => props.setHintSquare(hintHelper.getHint())}>
            Hint
        </button> :
        <></>
        }

    </main>
    )
}