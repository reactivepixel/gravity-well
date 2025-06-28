import { useState } from "react";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { navigation_data } from "../data/nav";

const DRAWER_WIDTH = 280;

const Sidebar_Drawer = ({ is_open, on_close }) => {
  const [expanded_sections, set_expanded_sections] = useState({});
  const location = useLocation();

  const toggle_section = (section_id) => {
    set_expanded_sections((prev) => ({
      ...prev,
      [section_id]: !prev[section_id],
    }));
  };

  const is_active_path = (path) => {
    return location.pathname === path;
  };

  const render_nav_item = (item, is_sub_item = false) => {
    const Icon = item.icon;
    const is_active = is_active_path(item.path);

    return (
      <ListItem key={item.path || item.id} disablePadding>
        <ListItemButton
          component={Link}
          to={item.path}
          selected={is_active}
          sx={{
            pl: is_sub_item ? 4 : 2,
            "&.Mui-selected": {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              "& .MuiListItemIcon-root": {
                color: "primary.contrastText",
              },
            },
          }}
        >
          {Icon && (
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
          )}
          <ListItemText primary={item.label} />
        </ListItemButton>
      </ListItem>
    );
  };

  const render_collapsible_section = (section) => {
    const Icon = section.icon;
    const is_expanded = expanded_sections[section.id];

    return (
      <Box key={section.id}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => toggle_section(section.id)}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={section.label} />
            {is_expanded ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={is_expanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {section.sub_links.map((sub_item) =>
              render_nav_item({ ...sub_item, icon: null }, true)
            )}
          </List>
        </Collapse>
      </Box>
    );
  };

  const drawer_content = (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        {navigation_data.sidebar_sections.map((section) => {
          if (section.collapsible && section.sub_links) {
            return render_collapsible_section(section);
          } else {
            return render_nav_item(section);
          }
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={is_open}
        onClose={on_close}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
      >
        {drawer_content}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="persistent"
        open={is_open}
        sx={{
          display: { xs: "none", md: "block" },
          width: is_open ? DRAWER_WIDTH : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer_content}
      </Drawer>
    </>
  );
};

export default Sidebar_Drawer;
