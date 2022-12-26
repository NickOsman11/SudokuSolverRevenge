import Grid from "./Grid";
import Numpad from "./Numpad";
import HintHelper from "../../GameObjects/hintHelper";
import Puzzle from "../../GameObjects/puzzle";
import Square from "../../GameObjects/square";
import { useEffect, useState } from "react";
import "./GameScreen.scss"
import { InitialPuzzle, Settings } from "./Settings";
import puzzles from "../../assets/puzzles";
import { useParams } from "react-router";


export default function GameScreen(): JSX.Element  {

    const {puzzleID} = useParams()
    const puzzleNumber = parseInt(puzzleID!) -1

    const [initialPuzzle, setInitialPuzzle] = useState<InitialPuzzle>();
    const [puzzle, setPuzzle]= useState<Puzzle>();
    const [easyMode, setEasyMode] = useState(false);
    const [selectedSquare, setSelectedSquare] = useState<Square>();    //orange square on the grid/numpad
    const [hintSquare, setHintSquare] = useState<Square>();            //green square highlighted by pressing hint button
    const [message, setMessage] = useState<string>();

    useEffect(() => {
        newGame();
    }, [puzzleNumber]);
    
    if (initialPuzzle === undefined || puzzle === undefined) {
        newGame()
        return <></>
    }
    if (Number.isNaN(puzzleNumber) || puzzleNumber < 0 || puzzleNumber >= puzzles.RawSudoku.length) {
        return <p>Invalid Puzzle ID - try a number from 1 to {puzzles.RawSudoku.length} </p>
    }

    function newGame() {
        
        const rawMatrix= puzzles.RawSudoku[puzzleNumber]
        setInitialPuzzle(
            {puzzleNumber: puzzleNumber, 
            rawMatrix: rawMatrix,
            solvedMatrix: puzzles.SolvedSudoku[puzzleNumber]
        });
        setPuzzle(new Puzzle(rawMatrix));
        setSelectedSquare(undefined)
        setHintSquare(undefined)
        setMessage(undefined)
    }

    let hintHelper = new HintHelper(puzzle)

    function makeMove(newValue: number) {      

        if (!puzzle) {
            return
        }
        if (!selectedSquare) {
            return
        }
        setMessage(undefined)
        const [row, col] = [selectedSquare.row, selectedSquare.col]
        let puzzleCopy = new Puzzle(undefined, puzzle.matrix.map(i => {return i.map(j => {return j})}))
        //creates a copy of the current puzzle which can be altered and used to set the new puzzle state

        if (!easyMode) {                                                    //hard mode-----------------------------
            if (puzzle.numberAt(row, col) !== newValue) {                   //if a number different from the one already there was guessed
                puzzleCopy.setNumber(row, col, newValue)                    //set that number
            }
            else {                                                          //if the number already there was guessed
                puzzleCopy.setNumber(row, col, 0)                           //unset that number
            }
        }
        else if (hintHelper.checkIfMoveCorrect(row, col, newValue)) {               //easy mode-----------------------------
            puzzleCopy.setNumber(row, col, newValue)                                //if enough info is available to know the move is correct, set that number 
            if (hintSquare && hintSquare.row === row && hintSquare.col === col) {   //if that was the hint square,
                setHintSquare(undefined)                                            //set it to blank
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
                hintHelper={hintHelper}
            />
            <Settings 
                puzzle={puzzle}
                setPuzzle={setPuzzle}
                initialPuzzle={initialPuzzle}
                determinedSquares={hintHelper.determinedSquares}
                easyMode={easyMode}
                setEasyMode={setEasyMode}
                setHintSquare={setHintSquare}
                selectedSquare={selectedSquare}
                setSelectedSquare={setSelectedSquare}
                setMessage={setMessage}
            />
        </div>
        <div className="message">
            {message ? <p>{message}</p> : <p></p>}
        </div>
    </main>
    )
}