import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import NotFound from './components/NotFound';
import { UserContext } from './contexts/UserContext';
import useUser from './hooks/useUser';

export default function App() {
	const { user, saveUser } = useUser();
	
	return (
		<Router>
			<UserContext.Provider value={{ user, saveUser }}>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/home' element={<HomePage />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/game/:gameId' element={<GamePage />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</UserContext.Provider>
		</Router>
	);
};