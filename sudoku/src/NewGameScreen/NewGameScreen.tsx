interface NewGameScreenProps {
    newGame: () => void;
    easyMode: boolean;
}

export default function NewGameScreen({
    newGame,
    easyMode,}: NewGameScreenProps): JSX.Element{

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
                    onClick={() => {easyMode = !easyMode; console.log(easyMode);}}/>
                Easy mode          
            </div>
        </div>          
    )
}
