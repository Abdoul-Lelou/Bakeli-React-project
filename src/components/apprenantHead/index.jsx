import React, { useState,useEffect } from "react";
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
import { FiHome, FiLogOut} from "react-icons/fi";




//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./index.css";

const ApprenantHeader = () => {
    const [menuCollapse, setMenuCollapse] = useState(true);

   const routeLink= useHistory()

   //create a custom function that will change menucollapse state from false to true and true to false


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
             <MenuItem active={true} icon={<FiHome />} onClick={()=>routeLink.push('welcome')} title='Acceuil'/>
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
}

export default ApprenantHeader
