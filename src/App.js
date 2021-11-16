
import React from 'react';
import './App.css';
import Sidebar from './components/header';
import { Route, Switch, } from 'react-router-dom'
import Welcome from './components/welcome';
import Login from './components/login';
import SignIn from './components/signIn';
import Cours from './components/cours';
import Archives from './components/archives';
import Prof from './components/prof';
import ListProf from './components/listProf';
import ListApprenant from './components/listApprenant'





class App extends React.Component {
		
	render() {
		return (
			<>
			
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

					<Route path='/listapprenant' exact>
						<Sidebar />
						<ListApprenant />
					</Route>

					<Route path='/mod' exact>
						<Sidebar />
						
					</Route>

				</Switch>
			

			
			</>
		)
	}
}
export default  App;


