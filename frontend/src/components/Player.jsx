import '../styles/Player.css';

export default function Player({ username, hp, avatar, onClick }) {
    return (
        <div className='player-container' onClick={onClick}>
            <div className='player-username-container'>
                <span>{username}</span>
            </div>
            <div className='player-avatar'>
                <img src={avatar} alt={`${username} avatar`} />
            </div>
            <div className='player-hp-container'>
                <span>❤️</span>
                <span>{hp}</span>
            </div>
        </div>
    );
}