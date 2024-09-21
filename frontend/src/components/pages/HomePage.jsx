import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';
import useSocketContext from '../../hooks/useSocketContext';

import '../../styles/menu.css';
import '../../styles/start_game.css';
import '../../styles/rules.css';

export default function HomePage() {
    const { user } = useUserContext();
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
                        <div className="rules_btn_cnl" onClick={() => setRulesVisible(false)}>
                            <span className="text">Quit</span>
                        </div>
                        <div className="rules-text">
                            <p>Rules</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="button">
                <Link to='/login' style={{ color: 'white', textDecoration: 'none' }}>
                    Quit game
                </Link>
            </div>
            {!user && <Navigate to='/login' />}
            {Object.keys(gameData).length && <Navigate to='/game' state={gameData}/>}
        </div>
    );
}
