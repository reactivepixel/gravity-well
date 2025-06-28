import React from "react";
import Users_Section from "../components/Users_Section.jsx";
import { Typography } from "@mui/material";

function Users() {
  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 4,
          fontWeight: "medium",
          color: "text.primary",
        }}
      >
        User Management
      </Typography>
      <Users_Section />
    </>
  );
}

export default Users;
