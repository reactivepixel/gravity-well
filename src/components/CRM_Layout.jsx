import { useState } from "react";
import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import Top_Navigation from "./Top_Navigation";
import Sidebar_Drawer from "./Sidebar_Drawer";

const CRM_Layout = ({ children }) => {
  const theme = useTheme();
  const is_mobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawer_open, set_drawer_open] = useState(!is_mobile);

  const handle_drawer_toggle = () => {
    set_drawer_open(!drawer_open);
  };

  const handle_drawer_close = () => {
    set_drawer_open(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Top_Navigation on_menu_click={handle_drawer_toggle} />

      <Sidebar_Drawer is_open={drawer_open} on_close={handle_drawer_close} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawer_open ? "280px" : "0px"})` },
          ml: { md: drawer_open ? "280px" : 0 },
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default CRM_Layout;
