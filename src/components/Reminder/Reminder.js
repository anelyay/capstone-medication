import "./Reminder.scss"

export default function Reminder ({pill, quantity}) {

    return (
        <div>
            <p>Seems like you are going to run out of {pill} soon. You have {quantity} pills left.</p>
        </div>
    )
}
