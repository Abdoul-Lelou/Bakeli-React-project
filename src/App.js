import logo from './logo.svg';
import './App.css';
import Sidebar from './components/header';
import {BrowserRouter as Router, Route,Link,Switch,} from 'react-router-dom'
import Login from './components/login';

function App() {
  return (
    <div className="App">
     <Router>					
					<Switch>
						<Route path='/' exact>
							<Login />
						</Route>
					</Switch>
					
						<Switch>
							
						</Switch>
						
					
			</Router>		
    </div>
  );
}

export default App;
