import Grid from "./Grid";
import Numpad from "./Numpad";
import HintHelper from "../../GameObjects/hintHelper";
import Puzzle from "../../GameObjects/puzzle";
import Square from "../../GameObjects/square";
import { useState } from "react";

interface GameScreenProps {
    initialPuzzle: number[][];
    puzzle: Puzzle;
    setPuzzle: (newPuzzle: Puzzle) => void;
    easyMode: boolean;
}

export default function GameScreen(props : GameScreenProps): JSX.Element  {

    //the orange highlighted square on the grid which will be set by clicking the numpad
    const [selectedSquare, setSelectedSquare] = useState<Square>(new Square(-1, -1, 0));    
    //a red highlighted square indicating a place where enough information is present to determine the number
    const [hintSquare, setHintSquare] = useState<Square>(new Square(-1, -1, 0));

    let hintHelper = new HintHelper(props.puzzle)

    function makeMove(newValue: number) {      

        if (!props.puzzle) {
            return
        }

        const [row, col] = [selectedSquare.row, selectedSquare.col]
        let puzzleCopy = new Puzzle(undefined, props.puzzle.matrix.map(i => {return i.map(j => {return j})}))
        //creates a copy of the current puzzle which can be altered and used to set the new puzzle state

        if (props.easyMode) {                                               //easy mode-----------------------------
            if (hintHelper.checkIfNumberEliminated(row, col, newValue)) {   //If an eliminated number was guessed
                puzzleCopy.addTriedNumber(row, col, newValue)               //crosses it off the list (will not appear on numpad any more)
            }
            else if (hintHelper.checkIfMoveCorrect(row, col, newValue)) {   //Sets number if number is fully degtermined
                puzzleCopy.setNumber(row, col, newValue)                    //If indeterminate, does nothing
            }                                                               //Numbers can only be entered when known to be correct, and cannot be removed
        }                                                                       
        else {                                                              //hard mode-----------------------------
            if (props.puzzle.numberAt(row, col) !== newValue) {             //if a number different from the one already there was guessed
                puzzleCopy.setNumber(row, col, newValue)                    //set that number
            }
            else {                                                          //if the number already there was guessed
                puzzleCopy.setNumber(row, col, 0)                           //unset that number
            }
        }
        setSelectedSquare(puzzleCopy.matrix[row][col])
        props.setPuzzle(puzzleCopy)
    }

    return (
    <main className="puzzle-area">
        <Grid 
            initialPuzzle={props.initialPuzzle}
            puzzle={props.puzzle}
            selectedSquare={selectedSquare}
            setSelectedSquare={setSelectedSquare}
            hintSquare={hintSquare}
        />
        <Numpad 
            selectedSquare={selectedSquare}
            puzzle={props.puzzle}
            makeMove={makeMove}
        />
        {props.easyMode ?  
        <button
            onClick={() => {
                let square = hintHelper.getHint()
                setHintSquare(square)
                setSelectedSquare(new Square(square.row, square.col, 0));
            }}
        >
            Hint
        </button> :
        <></>
        }

    </main>
    )
}