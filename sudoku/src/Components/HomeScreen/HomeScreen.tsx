import { useNavigate } from "react-router"
import puzzles from "../../assets/puzzles";


export function HomeScreen() {

    const navigate = useNavigate();

    return (
    <div>
        <h1>
            SUDOKU
        </h1>
        <button
            onClick={() => {navigate(`/${Math.floor(Math.random()*puzzles.RawSudoku.length) + 1}`)}} //navigate to random game
        >
            Play
        </button>
    </div>
    )
}