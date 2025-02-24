import './App.css';
import TableToDo from './components/Todo/table_todo';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import AccountArea from './components/accountArea';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/home/login';

function App() {
    const [username, setUsername] = useState(null);
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		try {
			const token = localStorage.getItem('authToken');
			console.log(token)
			if (token) {
				const decoded = jwtDecode(token);
				console.log(decoded)
				setUsername(decoded.username);
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(true)
		}
	}, []);
	
	if (!loading) {
		return
	}
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/login" element={<LoginPage username={username} />} />
					<Route path="/" element={<TableToDo username={username} />} />
				</Routes>
			</Router>
			
		</div>
	);
}

export default App;
