import { useState } from "react";
import puzzles from "../../assets/puzzles";
import Puzzle from "../../GameObjects/puzzle";
import Square from "../../GameObjects/square";

interface NewGameScreenProps {
    setInitialPuzzle: (initialPuzzle: number[][]) => void;
    setPuzzle: (puzzle: Puzzle) => void;
    easyMode: boolean;
    setEasyMode: (mode: boolean) => void
}

export default function NewGameScreen(props: NewGameScreenProps): JSX.Element{

    function newGame() {
        
        const randomNumber = Math.floor(Math.random()*puzzles.RawSudoku.length)
        let startingPuzzle = puzzles.RawSudoku[randomNumber]
        const newPuzzle = new Puzzle(startingPuzzle)
        props.setInitialPuzzle(startingPuzzle);
        props.setPuzzle(newPuzzle);
    }

    return ( 
        <div>
            <div>
                <button
                    onClick={newGame}>
                    New Game
                </button>
            </div>
            <div>
                <input 
                    type="checkbox"
                    onClick={() => props.setEasyMode(!props.easyMode)}
                />
                <label>
                    Easy mode
                </label>      
            </div>
        </div>          
    )
}
