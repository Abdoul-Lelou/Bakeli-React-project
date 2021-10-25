import React, { useState } from "react";
import { useHistory } from 'react-router';
import { auth } from "../../firebase";

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
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import {IoIosPersonAdd} from "react-icons/io";
import {CgUserList} from "react-icons/cg";



//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./index.css";


const Header = () => {
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true);
    // const [active, setActive] = useState(true)

    const routeLink= useHistory()

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const logout= ()=>{
      auth.signOut();
      routeLink.push('')
  }

  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div>
           
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />} onClick={()=>routeLink.push('welcome')}>
                Home
              </MenuItem>
              <MenuItem icon={<FaList />} onClick={()=>routeLink.push('archives')}>Archives</MenuItem>
              <MenuItem icon={<CgUserList />} onClick={()=>routeLink.push('listprof')}>Archives</MenuItem>
              <MenuItem icon={<BsFileEarmarkPlusFill />}  onClick={()=>routeLink.push('cours')}>Cours</MenuItem>
              <MenuItem icon={<IoIosPersonAdd />}  onClick={()=>routeLink.push('prof')}>Profs</MenuItem>
              <MenuItem icon={<FaSign />} onClick={()=>routeLink.push('signin')}>Author</MenuItem>
              <MenuItem icon={<BiCog />}>Settings</MenuItem>
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