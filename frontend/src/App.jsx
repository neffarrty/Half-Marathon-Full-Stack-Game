import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import NotFound from './components/NotFound';
import { UserContext } from './contexts/UserContext';
import useUser from './hooks/useUser';

export default function App() {
	const { user, saveUser } = useUser();
	
	return (
		<Router>
			<UserContext.Provider value={{ user, saveUser }}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/home' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</UserContext.Provider>
		</Router>
	);
};