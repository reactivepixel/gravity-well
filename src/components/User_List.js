import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import user_store from "../stores/user_store";
import user_service from "../services/user_service";

function User_List() {
  const [users, set_users] = useState([]);

  useEffect(() => {
    const load_users = async () => {
      const fetched_users = await user_service.get_users();
      user_store.set_users(fetched_users);
    };

    load_users();

    const update_users = (new_users) => {
      set_users(new_users);
    };

    user_store.add_listener(update_users);
    return () => user_store.remove_listener(update_users);
  }, []);

  const handle_delete = async (user_id) => {
    await user_service.delete_user(user_id);
    user_store.delete_user(user_id);
  };

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handle_delete(user.id)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default User_List;
