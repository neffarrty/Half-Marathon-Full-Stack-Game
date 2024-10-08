import {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';
import useSocketContext from '../../hooks/useSocketContext';
import useAuth from '../../hooks/useAuth';

import '../../styles/HomePage.css';
import '../../styles/StartGameButton.css';
import '../../styles/Rules.css';

export default function HomePage() {
    const { user } = useUserContext();
    const { logout } = useAuth();
    const socket = useSocketContext();
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [areRulesVisible, setRulesVisible] = useState(false);
    const [gameData, setgameData] = useState({});

    const onGameFound = (data) => {
        setSearchVisible(false);
        setgameData(data);
    };

    const gameSearch = () => {
        setSearchVisible(true);
        socket.emit('game-search', { query: { token: user.token } });
    }
    
    useEffect(() => {
        if (socket) {
            socket.on('game-found', onGameFound);
        
            return () => {
                socket.off('game-found', onGameFound);
            };
        }
    }, [socket]);

    return (
        <div className="container">
            <div className="button" onClick={() => {
                    setSearchVisible(true);
                    gameSearch();
                }}>
                <span className="text">Start game</span>
            </div>
            {isSearchVisible && (
                <div id="search" className="search">
                    <div className="search-content">
                        <div className="search_btn_cnl" onClick={() => setSearchVisible(false)}>
                            <span className="text">Cancel</span>
                        </div>
                        <div className="search-text">
                            <p className="dots">Search</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="button" onClick={() => setRulesVisible(true)}>
                <span className="text">Rules</span>
            </div>
            {areRulesVisible && (
                <div id="rules" className="rules">
                    <div className="rules-content">
                        <div className="rules-text">
                            <p>Congratulations on joining our lively community. Whether you're here to share stories, exchange ideas, or simply monkey around, we're thrilled to have you swinging by!</p>
                        </div>
                        <button onClick={() => setRulesVisible(false)}>OK</button>
                    </div>
                </div>
            )}

            <div className="button" onClick={() => logout()}>
                Logout
            </div>
            {!user && <Navigate to='/login' />}
            {Object.keys(gameData).length !== 0 && <Navigate to={`/game/${gameData.gameRoom}`} state={gameData}/>}
        </div>
    );
}