import Grid from "./Grid";
import Numpad from "./Numpad";
import HintHelper from "../../GameObjects/hintHelper";
import Puzzle from "../../GameObjects/puzzle";
import Square from "../../GameObjects/square";
import { useState } from "react";
import "./GameScreen.scss"
import { InitialPuzzle, Settings } from "./Settings";
import puzzles from "../../assets/puzzles";


export default function GameScreen(): JSX.Element  {

    const [initialPuzzle, setInitialPuzzle] = useState<InitialPuzzle>();
    const [puzzle, setPuzzle]= useState<Puzzle>();
    const [easyMode, setEasyMode] = useState(false);
    const [selectedSquare, setSelectedSquare] = useState<Square>();    //orange square on the grid/numpad
    const [hintSquare, setHintSquare] = useState<Square>();            //green square highlighted by pressing hint button

    if (initialPuzzle === undefined || puzzle === undefined) {
        newGame()
        return <></>
    }
    
    function newGame() {

        const puzzleNumber = Math.floor(Math.random()*puzzles.RawSudoku.length)
        const rawMatrix= puzzles.RawSudoku[puzzleNumber]
        const solvedMatrix = puzzles.SolvedSudoku[puzzleNumber]
        setInitialPuzzle(
            {puzzleNumber: puzzleNumber, 
            rawMatrix: rawMatrix,
            solvedMatrix: solvedMatrix
        });
        setPuzzle(new Puzzle(rawMatrix));
        setSelectedSquare(undefined)
        setHintSquare(undefined)
    }

    let hintHelper = new HintHelper(puzzle)

    function makeMove(newValue: number) {      

        if (!puzzle) {
            return
        }
        if (!selectedSquare) {
            return
        }
        const [row, col] = [selectedSquare.row, selectedSquare.col]
        let puzzleCopy = new Puzzle(undefined, puzzle.matrix.map(i => {return i.map(j => {return j})}))
        //creates a copy of the current puzzle which can be altered and used to set the new puzzle state

        if (easyMode) {                                                     //easy mode-----------------------------
            if (hintHelper.checkIfNumberEliminated(row, col, newValue)) {   //If an eliminated number was guessed
                puzzleCopy.addTriedNumber(row, col, newValue)               //crosses it off the list (will not appear on numpad any more)
            }
            else if (hintHelper.checkIfMoveCorrect(row, col, newValue)) {   //Sets number if number is fully degtermined
                puzzleCopy.setNumber(row, col, newValue)                    //If indeterminate, does nothing
                if (hintSquare && hintSquare.row === row && hintSquare.col === col) {     //if that was the hint square,
                    setHintSquare(undefined)                    //set it to blank
                }
            }                                                               
        }                                                                       
        else {                                                              //hard mode-----------------------------
            if (puzzle.numberAt(row, col) !== newValue) {                   //if a number different from the one already there was guessed
                puzzleCopy.setNumber(row, col, newValue)                    //set that number
            }
            else {                                                          //if the number already there was guessed
                puzzleCopy.setNumber(row, col, 0)                           //unset that number
            }
        }
        setSelectedSquare(puzzleCopy.matrix[row][col])
        setPuzzle(puzzleCopy)
    }

    return (
    <main className="puzzle-area">
        <h3>#{initialPuzzle.puzzleNumber + 1}</h3>
        <Grid 
            initialPuzzle={initialPuzzle}
            puzzle={puzzle}
            selectedSquare={selectedSquare}
            setSelectedSquare={setSelectedSquare}
            hintSquare={hintSquare}
            easyMode={easyMode}
        />
        <div className="controls">
            <Numpad 
                selectedSquare={selectedSquare}
                puzzle={puzzle}
                makeMove={makeMove}
                easyMode={easyMode}
            />
            <Settings 
                puzzle={puzzle}
                setPuzzle={setPuzzle}
                initialPuzzle={initialPuzzle}
                determinedSquares={hintHelper.determinedSquares}
                easyMode={easyMode}
                setEasyMode={setEasyMode}
                newGame={newGame}
                setHintSquare={setHintSquare}
                setSelectedSquare={setSelectedSquare}
            />
        </div>
    </main>
    )
}