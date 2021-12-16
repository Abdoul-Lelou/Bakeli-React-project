
import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/header';
import { Route, Switch, withRouter,useHistory} from 'react-router-dom'
import Welcome from './components/welcome';
import Login from './components/login';
import SignIn from './components/signIn';
import Cours from './components/cours';
import Archives from './components/archives';
import Prof from './components/prof';
import ListProf from './components/listProf';
import ListApprenant from './components/listApprenant';
import { auth, dbFirestore } from './firebase';
import UserCards from './components/userCard';





const App =()=> {

	const [prenom, setPrenom] = useState('');
	const [nom, setNom] = useState('');
	const [url, setUrl] = useState('')

	const path= useHistory('')
	
		useEffect(() => {
			const uid = localStorage.getItem('uidLogin');
			// if (!uid) {
			// 	path.push('')
			// }
			!uid ?(
				path.push('')
			):(
				dbFirestore.doc(uid).get().then(res => {
					setUrl(res.data().url)
					setPrenom(res.data().prenom)
					setNom(res.data().nom)
					console.log(res.data().prenom)
					})
			)		
			
		}, [])
	
	
		
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

					<Route path='/user' exact>
						{/* <Sidebar /> */}
						<UserCards />
					</Route>
					

				</Switch>
			

			
			</>
		)
}
export default  App;


