import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { NavLink , useLocation} from 'react-router-dom';
import { useState } from 'react';
export default function CenteredTabs() {

  const location = useLocation()



  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={location.pathname} centered>
        {/* <Tab label="Home Page" component = {NavLink}  to= "/" value={"/"}/> */}
        <Tab label="תורמים" component = {NavLink} to= "/Donors" value={"/Donors"}/>
        <Tab label="הוצאות" component = {NavLink} to= "/Expenses" value={"/Expenses"}/>
        <Tab label="אברכים" component = {NavLink} to= "/Avrechim" value={"/Avrechim"}/>
        {/* <Tab label="Register" component = {NavLink} to= "/Register" value={"/Register"}/>
        <Tab label="My Cart" component = {NavLink} to= "/Cart" value={"/Cart"}/> */}
      </Tabs>
    </Box>
  );
}
