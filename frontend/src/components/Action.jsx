import '../styles/Action.css'

export default function Action({ action }) {
    switch(action.type) {
        case 'play-card':
            return (
                <div className='action-container'>
                    <span>{`[${action.user}] -> [${action.card.name}]`}</span>
                </div>
            );
        case 'attack-card':
            return (
                <div className='action-container'>
                    <span>{`[${action.user}] attack [${action.card.name}] -> [${action.target.name}]`}</span>
                </div>
            )
        case 'attack-player':
            return (
                <div className='action-container'>
                    <span>{`[${action.user}] attack [${action.card.name}] -> [${action.opponent}]`}</span>
                </div>
            )
    }
}