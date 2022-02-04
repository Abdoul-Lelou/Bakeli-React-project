import React, { useState,useEffect } from "react";
import { useHistory } from 'react-router';
import { auth } from "../../firebase";
import logo from '../../images/logoBakeli.png'

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




//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./index.css";
import { cleanup } from "@testing-library/react";


const Header = ({role}) => {
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true);
    const [roles, setRoles] = useState('');
    const [currentRoute, setCurrentRoute] = useState('')
    //  const [active, setActive] = useState(true)

    const routeLink= useHistory()

    //create a custom function that will change menucollapse state from false to true and true to false
  // const menuIconClick = () => {
  //   //condition checking to change state from true to false and vice versa
  //   menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  // };

  const logout= ()=>{
    localStorage.removeItem('userRole');
    localStorage.removeItem('uidLogin')
    auth.signOut();
    routeLink.push('welcome')
    window.location.reload()

  }

  useEffect((e) => {
    const currentRole=localStorage.getItem('userRole');
    setRoles(currentRole);
    activeRoute(e);
    // console.log(window.location.pathname)
    cleanup();
  }, [role,currentRoute])

  const activeRoute=(e)=>{
  //  e.preventDefault();
   const path= window.location.pathname;
    setCurrentRoute(path)
    console.log(path.split('/').join(''))
  }

  return (
      
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>

          <SidebarHeader>
            <div className="logotext">
                {/* small and big change using menucollapse state */}
                 <img src={logo} height={50} className='border' width={80} alt="" srcSet="" />  
            </div>
          </SidebarHeader>

          <SidebarContent>
            <Menu iconShape="square">

              {role === 'apprenant'?(
                <>
                  {/* <MenuItem id='welcome' active={true} icon={<FiHome />} onClick={()=>routeLink.push('welcome')} title='Acceuil'/> */}
                  <MenuItem id='welcome' active={window.location.pathname === "/welcome"} icon={<FaList />} onClick={(e)=>{routeLink.push('welcome');activeRoute(e)}} title='Acceuil'/>
                  <MenuItem id='welcome'active={window.location.pathname === "/user"} icon={<BiCog />} onClick={(e)=>{routeLink.push('user');activeRoute(e)}}>Settings</MenuItem>
                </>
              ):(
                <>
                  <MenuItem id='welcome' active={window.location.pathname === "/welcome"} icon={<FiHome />} onClick={(e)=>{routeLink.push('welcome');activeRoute(e)}} title='Acceuil'/>
                  {/* <MenuItem id='welcome' icon={<BsCalendarDay />} onClick={()=>routeLink.push('welcome')} title='Acceuil'/> */}
                  <MenuItem id='archives' className='ok' active={window.location.pathname === "/archives"} icon={<FaList />} onClick={(e)=>{routeLink.push('archives');activeRoute(e)}} title='Archives'/>
                  <MenuItem id='listprof' active={window.location.pathname === "/listprof"} icon={<CgUserList />} onClick={(e)=>{routeLink.push('listprof');activeRoute(e)}} title='Professeurs'/>
                  <MenuItem id='listapprenant' active={window.location.pathname === "/listapprenant"} icon={<MdSupervisedUserCircle />} onClick={(e)=>{routeLink.push('listapprenant');activeRoute(e)}} title='Apprenants'/>
                  <MenuItem id='cours' active={window.location.pathname === "/cours"} icon={<BsFileEarmarkPlusFill />}  onClick={(e)=>{routeLink.push('cours');activeRoute(e)}} title='Ajouter Cours'/>
                  <MenuItem id='prof' active={window.location.pathname === "/prof"} icon={<IoIosPersonAdd />}  onClick={(e)=>{routeLink.push('prof');activeRoute(e)}} title='Ajouter Professeur'/>
                  <MenuItem id='signin' active={window.location.pathname === "/signin"} icon={<FaSign />} onClick={(e)=>{routeLink.push('signin');activeRoute(e)}} title='Inscription'/>
                  <MenuItem id='welcome' active={window.location.pathname === "/user"} icon={<BiCog />} onClick={(e)=>{routeLink.push('user');activeRoute(e)}}>Settings</MenuItem>
                </>
              )}
             
            </Menu>
          </SidebarContent>

          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} onClick={()=>logout()}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>

        </ProSidebar>
      </div>
    </>
  );
};

export default Header;