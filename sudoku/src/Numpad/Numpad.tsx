import './Numpad.css'

export default function Numpad({numbers}: {numbers: number[]}): JSX.Element{



    return(
        <div className="numpad">
            {numbers.map(n => {
                return (
                    <button className="numpad-square">
                        {n + 1}
                    </button>
                )
            })}
        </div>
    )
}