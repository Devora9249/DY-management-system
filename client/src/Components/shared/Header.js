import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
export default function Header() {

  const location = useLocation()
  const isMobile = useMediaQuery("(max-width:600px)");


  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#f7f7f7", // ⭐ רקע אפור בהיר
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // ⭐ הצללה עדינה
        paddingBottom: 1,
      }}
    >
      {/* לוגו */}
      <Box
        component="img"
        src="/logo.jpg"
        alt="לוגו"
        sx={{
          display: "block",
          margin: "0 auto",
          maxWidth: "180px",
          paddingTop: "10px",
        }}
      />

      {/* כותרת */}
      <Box
        component="h1"
        sx={{
          textAlign: "center",
          fontSize: isMobile ? "1.5rem" : "2rem", // ⭐ התאמה למובייל
          fontWeight: 500,
          color: "#333",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        אתר ניהול לכולל
      </Box>

      {/* טאבים */}
      <Tabs
        value={location.pathname}
        centered={!isMobile}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons={false}
        sx={{
          "& .MuiTab-root": {
            color: "#555",
            fontWeight: 500,
          },
          "& .Mui-selected": {
            color: "#b71c1c", // ⭐ אדום עדין
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#b71c1c", // ⭐ אדום עדין לפס התחתון
          },
        }}
      >
        <Tab label="תורמים" component={NavLink} to="/Donors" value="/Donors"   style={({ isActive }) => ({ color: isActive ? "#b71c1c" : "#000",})}/>
        <Tab label="הוצאות" component={NavLink} to="/Expenses" value="/Expenses"   style={({ isActive }) => ({ color: isActive ? "#b71c1c" : "#000",})}/>
        <Tab label="אברכים" component={NavLink} to="/Avrechim" value="/Avrechim"   style={({ isActive }) => ({ color: isActive ? "#b71c1c" : "#000",})}/>
        <Tab label="חלוקת מלגות" component={NavLink} to="/Milgot" value="/Milgot"   style={({ isActive }) => ({ color: isActive ? "#b71c1c" : "#000",})}/>
      </Tabs>
    </Box>
  );
}
//   return (
//     <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
//       <img src="/logo.jpg"  style={{ display: 'block', margin: '0 auto', maxWidth: '200px', paddingTop: '10px' }} />
//       <h1>אתר ניהול לכולל</h1>
//       <Tabs value={location.pathname} centered>
//         {/* <Tab label="Home Page" component = {NavLink}  to= "/" value={"/"}/> */}
//         <Tab label="תורמים" component={NavLink} to="/Donors" value={"/Donors"} />
//         <Tab label="הוצאות" component={NavLink} to="/Expenses" value={"/Expenses"} />
//         <Tab label="אברכים" component={NavLink} to="/Avrechim" value={"/Avrechim"} />
//         <Tab label="חלוקת מילגות" component={NavLink} to="/Milgot" value={"/Milgot"} />
//       </Tabs>
//     </Box>
//   );
// }


