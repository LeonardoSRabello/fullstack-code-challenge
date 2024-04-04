import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  Typography,
  CircularProgress
} from "@mui/material";

import { useStore } from "src/modules/storeProvider";
import { USERS_HEADERS } from "src/utils/constants";

const Users: React.FC = observer(() => {
  const navigate = useNavigate();
  const { users } = useStore();

  useEffect(() => {
    users.getUsers();
  }, []);

  return (
    <Box sx={{ py: 2 }}>
      <TableContainer sx={{ minHeight: 250 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {USERS_HEADERS.map(header => (
                <TableCell key={header.key} align={header.align}>
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!users.error && !users.loading && (
              <>
                {users.users.map(user => (
                  <TableRow
                    key={user._id}
                    hover
                    sx={{
                      "&:last-child td, &:last-child ht": { border: 0 }
                    }}
                    onClick={() => navigate(`/users/${user._id}`)}
                  >
                    {USERS_HEADERS.map(header => (
                      <TableCell key={header.key} align={header.align}>
                        {user[header.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
        {users.loading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {!users.loading && !!users.error && (
          <Typography
            fontSize={20}
            color="error"
            textAlign="center"
            sx={{ p: 3 }}
          >
            {users.error}
          </Typography>
        )}
        {!users.loading && !users.error && !users.users.length && (
          <Typography fontSize={20} textAlign="center" sx={{ p: 3 }}>
            No items to show
          </Typography>
        )}
      </TableContainer>
      <Box sx={{ py: 2, display: "flex", alignItems: "center" }}>
        <Typography
          sx={{ flexGrow: 1 }}
        >{`Total count: ${users.totalCount}`}</Typography>
        <Pagination
          count={users.totalPageCount}
          page={users.page}
          color="primary"
          onChange={(_, value) => {
            users.changePage(value);
          }}
        />
      </Box>
    </Box>
  );
});

export default Users;
