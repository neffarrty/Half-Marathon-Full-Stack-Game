import '../styles/Card.css';

export default function Card({ hero, onClick, isActive, isPlayer }) {
    return isPlayer ? (
                <button
                    className={`card-container ${isActive ? 'animate' : ''} ${isPlayer? '' : 'opponent'}`}
                    style={{ backgroundColor: hero['bg_color'] }}
                    onClick={onClick}
                >
                    <div className='top-section'>
                        <div className='coin-card'><span className='cost'>{hero.cost}</span></div>
                    </div>
                    <div className='image-section'>
                        <img className='character-image' src={`${import.meta.env.VITE_HOST_URL}${hero.img}`} alt={hero.name} />
                    </div>
                    <p className='character-name'>{hero.name}</p>
                    <div className='text-box' style={{ backgroundColor: hero['bg_text_color'] }}>
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