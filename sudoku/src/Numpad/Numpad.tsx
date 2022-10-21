import './Numpad.css'

interface NumpadProps {
    numbers: number[];
    setNewValue: (newValue: number) => void;
}

export default function Numpad(
    {numbers,
    setNewValue}: NumpadProps): JSX.Element{

    return(
        <div className="numpad">
            {numbers.map(n => {
                return (
                    <button 
                        className="numpad-square"
                        onClick={() => setNewValue(n+1)}>
                        {n + 1}
                    </button>
                )
            })}
        </div>
    )
}