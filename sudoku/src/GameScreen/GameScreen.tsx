import Grid from "../Grid/Grid";
import Numpad from "../Numpad/Numpad";
import HintHelper from "../Puzzle/hintHelper";
import Puzzle from "../Puzzle/puzzle";
import Square from "../Puzzle/square";

interface GameScreenProps {
    initialPuzzle: number[][];
    puzzle: Puzzle;
    setPuzzle: (newPuzzle: Puzzle) => void;
    selectedSquare: Square;
    setSelectedSquare: (newSelectedSquare: Square) => void;
    hintSquare: Square;
    setHintSquare: (newHintSquare: Square) => void;
}

export default function GameScreen( {
    initialPuzzle,
    puzzle,
    setPuzzle,
    selectedSquare,
    setSelectedSquare,
    hintSquare,
    setHintSquare,
    }
    : GameScreenProps): JSX.Element  {

    const [row, col] = [selectedSquare.row, selectedSquare.col]
    let puzzleCopy = createCopy(puzzle)

    function createCopy(puzzle: Puzzle){
        let copyOfCurrentMatrix = puzzle.matrix.map(i => {return i.map(j => {return j})})
        return new Puzzle(puzzle.easyMode, undefined, copyOfCurrentMatrix)
    }

    function makeMove(newValue: number) {

        if (!puzzle) {
            return
        }
        if (puzzle.easyMode) {
            updatePuzzleWithHints(newValue)
        }
        else {
            updatePuzzleWithoutHints(newValue)
        }
        setSelectedSquare(puzzleCopy.matrix[row][col])
        setPuzzle(puzzleCopy)
    }

    function updatePuzzleWithHints(newValue: number) {

        let hintHelper = new HintHelper(puzzle);
        if (hintHelper.numberIsEliminated(row, col, newValue)) {
            puzzleCopy.addTriedNumber(row, col, newValue)
        }
        else if (hintHelper.checkIfNumberIsDetermined(row, col, newValue)) {
            puzzleCopy.setNumber(row, col, newValue)
        }
    }

    function updatePuzzleWithoutHints(newValue: number) {

        if (puzzle.numberAt(row, col) === newValue) {
            puzzleCopy.setNumber(row, col, 0)
        }
        else {
            puzzleCopy.setNumber(row, col, newValue)
        }
    }

    function getHint(): Square{
        return new HintHelper(puzzle).getHint()
    }

    return (
    <main className="puzzle-area">
        <Grid 
            initialPuzzle={initialPuzzle}
            puzzle={puzzle}
            selectedSquare={selectedSquare}
            setSelectedSquare={setSelectedSquare}
            hintSquare={hintSquare}
        />
        <Numpad 
            selectedSquare={selectedSquare}
            puzzle={puzzle}
            makeMove={makeMove}
        />
        {puzzle.easyMode ?  
        <button
            onClick={() => setHintSquare(getHint())}>
            Hint
        </button> :
        <></>
        }

    </main>
    )
}