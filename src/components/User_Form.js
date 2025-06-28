import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Stack,
  Typography,
  MenuItem,
} from "@mui/material";
import user_store from "../stores/user_store";
import user_service from "../services/user_service";

function User_Form() {
  const [form_data, set_form_data] = useState({
    name: "",
    email: "",
    role: "User",
  });

  const handle_change = (event) => {
    const { name, value } = event.target;
    set_form_data((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handle_submit = async (event) => {
    event.preventDefault();
    try {
      const new_user = await user_service.add_user(form_data);
      user_store.add_user(new_user);
      set_form_data({
        name: "",
        email: "",
        role: "User",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" component="h3" gutterBottom>
        Add New User
      </Typography>
      <form onSubmit={handle_submit}>
        <Stack spacing={2}>
          <TextField
            name="name"
            label="Name"
            value={form_data.name}
            onChange={handle_change}
            required
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={form_data.email}
            onChange={handle_change}
            required
            fullWidth
          />
          <TextField
            name="role"
            label="Role"
            select
            value={form_data.role}
            onChange={handle_change}
            required
            fullWidth
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary">
            Add User
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default User_Form;
