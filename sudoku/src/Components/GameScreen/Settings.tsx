import Puzzle from "../../GameObjects/puzzle";
import Square from "../../GameObjects/square";
import "./Settings.scss"

export interface InitialPuzzle {
    puzzleNumber: number;
    rawMatrix: number[][];
    solvedMatrix: number[][];
}

interface SettingsProps {
    puzzle: Puzzle;
    setPuzzle: (puzzle: Puzzle) => void;
    initialPuzzle: InitialPuzzle;
    determinedSquares: Square[];
    easyMode: boolean;
    setEasyMode: (mode: boolean) => void;
    newGame: () => void;
    setHintSquare: (hintSquare: Square | undefined) => void;
    setSelectedSquare: (selectedSquare: Square | undefined) => void;
}

export const Settings = (props: SettingsProps) => {

    function toggleEasyMode() {
        //if easy mode was turned off, incorrect moves might have been made
        //so when it is turned back on, we check the current puzzle against the
        //completed puzzle we have on file, and remove any incorrect guesses
        if (!props.easyMode) {
            let puzzleCopy = new Puzzle(undefined, props.puzzle.matrix.map(i => {return i.map(j => {return j})}))

            puzzleCopy.numbers.forEach(i => {
                puzzleCopy.numbers.forEach(j => {           //for each square:
                    if (puzzleCopy.numberAt(i, j) === 0) {  //if no number has been set, do nothing
                        return
                    }                                   
                    if (props.initialPuzzle.solvedMatrix[i][j] !== puzzleCopy.numberAt(i, j)) { //if number doesn't match known correct number:
                        puzzleCopy.matrix[i][j] = new Square(i, j, 0)                           //remove it from the new matrix
                    }
                })
            })
            props.setPuzzle(puzzleCopy)                   //replace puzzle with "corrected" copy                              
        }
        else {
            props.setHintSquare(undefined)
        }
        props.setEasyMode(!props.easyMode)
    }

    function getHint() {
        const squares = props.determinedSquares
        if (squares.length !== 0) {
            const square = squares[Math.floor(Math.random()*squares.length)]
            props.setHintSquare(square)
            props.setSelectedSquare(props.puzzle.matrix[square.row][square.col])
        }
        else {
            props.setHintSquare(undefined)
        }
    }

    function checkIfPuzzleComplete() {

        const incomplete = props.puzzle.matrix
            .some(row => {                      //does there exist a row
                return row.some(square => {     //containing a square
                    return square.value === 0   //whose value is 0?
                })
        })                                      //if so, puzzle is incomplete
        return !incomplete
    }

    function submit() {
        console.log("submitted")
    }

    return ( 
        <div className="settings">
            <div className="easymode-selector">
                <input 
                    type="checkbox"
                    onClick={toggleEasyMode}
                />
                <label>
                    Easy mode
                </label>      
            </div>
            <button
                className="settings-button"
                onClick={props.newGame}
            >
                New Game
            </button>

            <button
                className="settings-button"
                onClick={getHint}
                disabled={!props.easyMode}
            >
                Hint
            </button>

            <button
                className="settings-button"
                onClick={submit}
                disabled={!checkIfPuzzleComplete()}
            >
                Submit
            </button>

        </div>          
    )
}
