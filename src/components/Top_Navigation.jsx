import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { navigation_data, user_data } from "../data/nav";

const Top_Navigation = ({ on_menu_click }) => {
  const [anchor_el, set_anchor_el] = useState(null);
  const navigate = useNavigate();

  const handle_profile_menu_open = (event) => {
    set_anchor_el(event.currentTarget);
  };

  const handle_menu_close = () => {
    set_anchor_el(null);
  };

  const handle_logout = () => {
    handle_menu_close();
    // Add logout logic here
    console.log("Logging out...");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={on_menu_click}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          CRM Dashboard
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {navigation_data.top_nav.map((nav_item) => (
            <Button
              key={nav_item.path}
              color="inherit"
              component={Link}
              to={nav_item.path}
            >
              {nav_item.label}
            </Button>
          ))}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body2"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {user_data.name}
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handle_profile_menu_open}
              color="inherit"
            >
              <Avatar src={user_data.avatar_url} sx={{ width: 32, height: 32 }}>
                <AccountCircle />
              </Avatar>
            </IconButton>
          </Box>
        </Box>

        <Menu
          anchorEl={anchor_el}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchor_el)}
          onClose={handle_menu_close}
        >
          <MenuItem onClick={handle_menu_close}>
            <Typography variant="body2" color="text.secondary">
              {user_data.email}
            </Typography>
          </MenuItem>
          <MenuItem onClick={handle_menu_close}>Profile</MenuItem>
          <MenuItem onClick={handle_menu_close}>Settings</MenuItem>
          <MenuItem onClick={handle_logout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Top_Navigation;
