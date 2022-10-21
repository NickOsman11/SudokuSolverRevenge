import './Numpad.css'

interface NumpadProps {
    numbers: number[];
    selectedSquareValue: number,
    setValue: (newValue: number) => void;
}

export default function Numpad(
    {numbers,
    selectedSquareValue,
    setValue}: NumpadProps): JSX.Element{

    return(
        <div className="numpad">
            {numbers.map(n => {
                return (
                    <button 
                        className={`numpad-square`
                        + `${(selectedSquareValue === n+1 ? " selected" : "")}`}
                        onClick={() => setValue(n+1)}>
                        {n + 1}
                    </button>
                )
            })}
        </div>
    )
}