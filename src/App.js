
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
import { auth, dbArchive, dbCours, dbFirestore, dbProf } from './firebase';
import UserCards from './components/userCard';

import logo from './images/logoBakeli.png'

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList,FaSign } from "react-icons/fa";
import { FiHome, FiLogOut} from "react-icons/fi";
import { BsFileEarmarkPlusFill,BsCalendarDay } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import {IoIosPersonAdd} from "react-icons/io";
import {CgUserList} from "react-icons/cg";
import {MdSupervisedUserCircle} from "react-icons/md";





const App =()=> {

	const [prenom, setPrenom] = useState('');
	const [nom, setNom] = useState('');
	const [url, setUrl] = useState('')
	const [role, setRole] = useState('');
	const [cours, setCours] = useState([]);
	const [prof, setProf] = useState([]);
	const [user, setUser] = useState([])
	const [menuCollapse, setMenuCollapse] = useState(true);
	const [currentRoute, setCurrentRoute] = useState('')
	const [currentUser, setcurrentUser] = useState(false);

	const path= useHistory('')
	
		useEffect(() => {

			const uid = localStorage.getItem('uidLogin');
			setRole(localStorage.getItem('userRole'));

			 if (role ==='admin') {
				setcurrentUser(true)
			}
			// !uid ?(
			// 	path.push('')
			// ):(
			if (!!uid) {

				dbFirestore.doc(uid).get().then(res => {
					setUrl(res.data().url)
					setPrenom(res.data().prenom)
					setNom(res.data().nom)
					// setRole(res.data().role)
				})

				getApprenant()
				getApprenant()
				getCours()
				getProfs()
			}else{
				path.push('')	
			}
			
				
		}, [role,path])

	

		const activeRoute=(e)=>{
			 const path= window.location.pathname;
			  setCurrentRoute(path)
			  console.log(path.split('/').join(''))
		}

		

		const logout= ()=>{
			localStorage.removeItem('userRole');
			localStorage.removeItem('uidLogin')
			auth.signOut();
			window.location.reload()
			path.push('')
		}
	
		
		const getCours=()=>{
			dbCours.get().then((snapshot) => {
				const data = snapshot.docs.map((doc) => ({
				  id: doc.id,
				  ...doc.data(),
				}));
				setCours(data);
			  });
		}

		const getProfs=()=>{
			dbProf.get().then((snapshot) => {
				const data = snapshot.docs.map((doc) => ({
				  id: doc.id,
				  ...doc.data(),
				}));
				
				setProf(data);
			  });
		}

		const getApprenant=()=>{
			dbArchive.get().then((snapshot) => {
				const data = snapshot.docs.map((doc) => ({
				  id: doc.id,
				  ...doc.data(),
				}));
				setUser(data);
			  });
		}

		return (
			<>
			
			<Switch>
				<Route path='/' exact component={Login} />
					
 					{/* <Login />
 				</Route> */}
 			</Switch>


			 {/* <Sidebar role={role}/> */}

			 <div id="header">
				
				<ProSidebar collapsed={menuCollapse}>
		
					<SidebarHeader>
					<div className="logotext">
						{/* small and big change using menucollapse state */}
						<img src={logo} height={50} className='border' width={80} alt="" srcSet="" />  
					</div>
					</SidebarHeader>
		
					<SidebarContent>
					<Menu iconShape="square">
		
						{
						
						role !== 'apprenant' && currentUser?(
							<>
							<MenuItem id='welcome' active={window.location.pathname === "/welcome"} icon={<FiHome />} onClick={(e)=>{path.push('welcome');activeRoute(e)}} title='Acceuil'/>
							{/* <MenuItem id='welcome' icon={<BsCalendarDay />} onClick={()=>path.push('welcome')} title='Acceuil'/> */}
							<MenuItem id='archives' className='ok' active={window.location.pathname === "/archives"} icon={<FaList />} onClick={(e)=>{path.push('archives');activeRoute(e)}} title='Archives'/>
							<MenuItem id='listprof' active={window.location.pathname === "/listprof"} icon={<CgUserList />} onClick={(e)=>{path.push('listprof');activeRoute(e)}} title='Professeurs'/>
							<MenuItem id='listapprenant' active={window.location.pathname === "/listapprenant"} icon={<MdSupervisedUserCircle />} onClick={(e)=>{path.push('listapprenant');activeRoute(e)}} title='Apprenants'/>
							<MenuItem id='cours' active={window.location.pathname === "/cours"} icon={<BsFileEarmarkPlusFill />}  onClick={(e)=>{path.push('cours');activeRoute(e)}} title='Ajouter Cours'/>
							<MenuItem id='prof' active={window.location.pathname === "/prof"} icon={<IoIosPersonAdd />}  onClick={(e)=>{path.push('prof');activeRoute(e)}} title='Ajouter Professeur'/>
							<MenuItem id='signin' active={window.location.pathname === "/signin"} icon={<FaSign />} onClick={(e)=>{path.push('signin');activeRoute(e)}} title='Inscription'/>
							<MenuItem id='welcome' active={window.location.pathname === "/user"} icon={<BiCog />} onClick={(e)=>{path.push('user');activeRoute(e)}}>Settings</MenuItem>
						</>
						):(
						
						<>
							{/* <MenuItem id='welcome' active={true} icon={<FiHome />} onClick={()=>routeLink.push('welcome')} title='Acceuil'/> */}
							<MenuItem id='welcome' active={window.location.pathname === "/welcome"} icon={<FaList />} onClick={(e)=>{path.push('welcome');activeRoute(e)}} title='Acceuil'/>
							<MenuItem id='welcome'active={window.location.pathname === "/user"} icon={<BiCog />} onClick={(e)=>{path.push('user');activeRoute(e)}}>Settings</MenuItem>
						</>
						)
						}
					
					</Menu>
					</SidebarContent>
		
					<SidebarFooter>
					<Menu iconShape="square">
						<MenuItem icon={<FiLogOut />} onClick={()=>logout()}>Logout</MenuItem>
					</Menu>
					</SidebarFooter>
		
				</ProSidebar>
				
			</div>

				<Switch>
					<Route path='/welcome' exact>
						{/* <Sidebar /> */}
						<Welcome cour={cours} prof={prof} user={user} />
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


