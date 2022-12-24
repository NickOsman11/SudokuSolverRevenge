interface NewGameScreenProps {
    newGame: (newGame: boolean) => void;
}

export default function NewGameScreen(
    {newGame}: NewGameScreenProps): JSX.Element{
    
    let easyMode = false

    return ( 
        <div>
            <div>
                <button
                    onClick={() => newGame(easyMode)}>
                    New Game
                </button>
            </div>
            <div>
                <input 
                    type="checkbox"
                    onClick={() => {easyMode = !easyMode}}
                />
                <label>
                    Easy mode
                </label>      
            </div>
        </div>          
    )
}
