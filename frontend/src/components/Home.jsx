import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import '../styles/menu.css';
import '../styles/start_game.css';
import '../styles/rules.css';

export default function Home() {
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [areRulesVisible, setRulesVisible] = useState(false);
    const navigate = useNavigate();

/*    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/login');
        }
    });*/

    return (
        <div className="container">
            <div className="button" onClick={() => setSearchVisible(true)}>
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
        </div>
    );
}