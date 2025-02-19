import logo from './logo.svg';
import './App.css';
import TableToDo from './components/Todo/table_todo';

function App() {
	return (
		<div className="App">
			<h3 className='mt-2'> DANH SÁCH VIỆC </h3>
			<TableToDo />
    	</div>
	);
}

export default App;
