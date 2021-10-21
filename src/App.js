import logo from './logo.svg';
import './App.css';
import Sidebar from './components/header';
import {BrowserRouter as Router, Route,Switch,} from 'react-router-dom'
import Welcome from './components/welcome';
import Login from './components/login';
import SignIn from './components/signIn';
import Cours from './components/cours';

function App() {
  return (
    // <div className="App">
     <Router>					
					<Switch>
						<Route path='/' exact>
							<Login />
						</Route>
						
					</Switch>
					
						<Switch>
						<Route path='/welcome' exact>
							<Sidebar />
							<Welcome />
						</Route>

						<Route path='/signin' exact>
							<Sidebar />
							<SignIn />		
						</Route>

						<Route path='/cours' exact>
							<Sidebar />
							<Cours />		
						</Route>

					</Switch>
						
					
			</Router>		
    // </div>
	
  );
}

export default App;
