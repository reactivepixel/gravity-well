import React from "react";
import { Container } from "@mui/material";
import User_Form from "./User_Form.jsx";
import User_List from "./User_List.jsx";

function Users_Section() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <User_Form />
      <User_List />
    </Container>
  );
}

export default Users_Section;
