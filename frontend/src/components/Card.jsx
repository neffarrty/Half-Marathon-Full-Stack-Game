import '../styles/Card.css';

export default function Card({ hero, onClick, isActive, isPlayerCard }) {
    return isPlayerCard? (
                <button
                    className={`card-container ${isActive ? 'animate' : ''} ${isPlayerCard? '' : 'opponent'}`}
                    style={{ backgroundColor: hero.backgroundColor }}
                    onClick={onClick}
                >
                    <div className='top-section'>
                        <div className='coin-card'><span className='cost'>{hero.cost}</span></div>
                    </div>
                    <div className='image-section'>
                        <img className='character-image' src={hero.img} alt={hero.name} />
                    </div>
                    <p className='character-name'>{hero.name}</p>
                    <div className='text-box' style={{ backgroundColor: hero.backgroundColorText }}>
                        <span>{hero.description}</span>
                    </div>
                    <div className='bottom-section'>
                        <div className='sword'>
                            <div className='score-sword'>
                                <span>{hero.attack}</span>
                            </div>
                        </div>
                        <div className='shield'>
                            <div className='shield-icon'><span className='score-shield'>{hero.defense}</span></div>
                        </div>
                    </div>
                </button>
            ):
        <div className='card-container opponent'></div>
};