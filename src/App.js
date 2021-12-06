
import React from 'react';
import './App.css';
import Sidebar from './components/header';
import { Route, Switch, withRouter} from 'react-router-dom'
import Welcome from './components/welcome';
import Login from './components/login';
import SignIn from './components/signIn';
import Cours from './components/cours';
import Archives from './components/archives';
import Prof from './components/prof';
import ListProf from './components/listProf';
import ListApprenant from './components/listApprenant';
import { auth } from './firebase';





class App extends React.Component {

	constructor(props) {
		super(props)
	
		this.state = {
			
			userSession:(null),
			activeLink: false
		}
	}
	
	

	componentDidMount() {
		// console.log(auth.onAuthStateChanged(user=> console.log(user)))
		let listener=auth.onAuthStateChanged(user=>{
            user ? (this.setState({userSession:user})
            ): this.props.history.push('/')
			console.log(this.state.userSession)
        })
		console.log(window.location.pathname)
		// return () => {
        //     listener()
        // }
	}
	
		
	render() {
		return (
			<>
			
			<Switch>
				<Route path='/' exact component={Login} />
					
 					{/* <Login />
 				</Route> */}
 			</Switch>


			 <Sidebar />

				<Switch>
					<Route path='/welcome' exact>
						{/* <Sidebar /> */}
						<Welcome />
					</Route>

					<Route path='/signin' exact>
						{/* <Sidebar /> */}
						<SignIn />
					</Route>

					<Route path='/cours' exact>
						{/* <Sidebar /> */}
						<Cours />
					</Route>

					<Route path='/archives' exact>
						{/* <Sidebar /> */}
						<Archives />
					</Route>

					<Route path='/prof' exact>
						{/* <Sidebar /> */}
						<Prof />
					</Route>

					<Route path='/listprof' exact>
						{/* <Sidebar /> */}
						<ListProf />
					</Route>

					<Route path='/listapprenant' exact>
						{/* <Sidebar /> */}
						<ListApprenant />
					</Route>

					

				</Switch>
			

			
			</>
		)
	}
}
export default  App;


