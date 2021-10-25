import './App.css';
import Sidebar from './components/header';
import {BrowserRouter as Router, Route,Switch,} from 'react-router-dom'
import Welcome from './components/welcome';
import Login from './components/login';
import SignIn from './components/signIn';
import Cours from './components/cours';
import Modal from './components/modal';
import Archives from './components/archives';
import Prof from './components/prof';
import ListProf from './components/listProf';

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

						<Route path='/archives' exact>
							<Sidebar />
							<Archives />		
						</Route>

						<Route path='/prof' exact>
							<Sidebar />
							<Prof />		
						</Route>

						<Route path='/listprof' exact>
							<Sidebar />
							<ListProf />		
						</Route>

						<Route path='/mod' exact>
							<Sidebar />
							<Modal />		
						</Route>

					</Switch>
						
					
			</Router>		
    // </div>
	
  );
}

export default App;
