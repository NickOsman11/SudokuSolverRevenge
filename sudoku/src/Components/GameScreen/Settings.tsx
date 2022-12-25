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
    setMessage: (successMessage: string | undefined) => void;
}

export const Settings = (props: SettingsProps) => {

    function toggleEasyMode() {
        //if easy mode was turned off, incorrect moves might have been made
        //so when it is turned back on, we check the current puzzle against the
        //completed puzzle we have on file, and remove any incorrect guesses
        if (!props.easyMode) {
            let puzzleCopy = new Puzzle(undefined, props.puzzle.matrix.map(i => {return i.map(j => {return j})}))

            puzzleCopy.matrix.forEach(row => {              //for each row
                row.filter(square => square.value !== 0)    //find all the squares that are not blank
                                                            //of those find all squares that do not match the solved matrix
                .filter(square => square.value !== props.initialPuzzle.solvedMatrix[square.row][square.col])
                                                            //for each of those, replace that square in the new matrix with a blank one
                .forEach(square => puzzleCopy.matrix[square.row][square.col] = new Square(square.row, square.col, 0) )
            })
            props.setPuzzle(puzzleCopy)                   //replace puzzle with corrected copy                              
        }
        props.setSelectedSquare(undefined)
        props.setHintSquare(undefined)
        props.setEasyMode(!props.easyMode)
    }

    function getHint() {
        const squares = props.determinedSquares
        if (squares.length === 0) {
            props.setMessage("Looks like there aren't any certain moves left to make!" 
                + " You'll have to turn off easy mode and make a guess, and see if that"
                + "leads to a contradiction. You can always turn easy mode"
                + "back on later, and any incorrect moves you've made will be removed")
        }
        else {
            const square = squares[Math.floor(Math.random()*squares.length)]
            props.setHintSquare(square)
            props.setSelectedSquare(props.puzzle.matrix[square.row][square.col])
        }
    }

    function checkIfPuzzleComplete() {

        const complete = props.puzzle.matrix
            .every(row => {                      //does every row
                return row.every(square => {     //contain only squares
                    return square.value !== 0   //whose value is not 0?
                })
        })                                      //if so, puzzle is complete
        return complete
    }

    function submit() {
        //check if solution is correct
        const correct = props.puzzle.matrix 
        .every(row => {                      //does every row
            return row.every(square => {     //contain only squares
                                            //whose value is the same as in the solved matrix?
                return square.value === props.initialPuzzle.solvedMatrix[square.row][square.col]   
            })
        })                                  //if so, solution is correct
        if (correct) {
            props.setMessage("Success! Great work")
        }
        else {
            props.setMessage("Are you sure? Why don't you double check...")
        }
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
                disabled={!props.easyMode || checkIfPuzzleComplete()}
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
