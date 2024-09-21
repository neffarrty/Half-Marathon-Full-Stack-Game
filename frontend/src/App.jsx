import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HomePage from './components/pages/HomePage';
import GamePage from './components/pages/GamePage';
import NotFound from './components/pages/NotFound';
import UserContextProvider from './contexts/user/UserContextProvider';
import SocketContextLayout from './contexts/socket/SocketContextLayout';

export default function App() {
	return (
		<Router>
			<UserContextProvider>
				<Routes>
					<Route path='/' element={<Navigate to='home' />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route element={<SocketContextLayout />}>
						<Route path='/home' element={<HomePage />} />
						<Route path='/game/:id' element={<GamePage />} />
					</Route>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</UserContextProvider>
		</Router>
	);
};