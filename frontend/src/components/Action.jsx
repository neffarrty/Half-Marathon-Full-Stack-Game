import '../styles/Action.css'

export default function Action({ action }) {
    return (
        action.type === 'play'
        ?
        <div className='action-container'>
            <span>{`[${action.user}] -> [${action.card.name}]`}</span>
        </div>
        :
        <div className='action-container'>
            <span>{`[${action.user}] attack [${action.card.name}] -> [${action.target.name}]`}</span>
        </div>
    );
}