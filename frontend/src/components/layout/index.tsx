import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Snackbar,
  Alert
} from "@mui/material";

import { useStore } from "src/modules/storeProvider";

const Layout: React.FC<PropsWithChildren<{}>> = observer(({ children }) => {
  const navigate = useNavigate();
  const { alerts } = useStore();

  return (
    <Box
      sx={{
        maxHeight: "100vh",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box>
        <AppBar position="static" sx={{ px: 1, py: 3 }}>
          <Toolbar sx={{ maxWidth: 1440, width: "100%", mx: "auto" }}>
            <Typography
              variant="h5"
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
              fontWeight="bold"
            >
              Limbic Test
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="inherit"
              size="large"
              onClick={() => navigate("/users")}
            >
              Users
            </Button>
            <Button
              color="inherit"
              size="large"
              onClick={() => navigate("/questions")}
            >
              Questions
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ flexGrow: 1, px: 1, py: 2 }}>
        <Box sx={{ maxWidth: 1440, width: "100%", mx: "auto" }}>{children}</Box>
      </Box>
      <Snackbar
        open={alerts.open}
        autoHideDuration={1500}
        onClose={() => alerts.dismiss()}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => alerts.dismiss()}
          variant="filled"
          severity={alerts.type === "error" ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {alerts.message}
        </Alert>
      </Snackbar>
    </Box>
  );
});

export default Layout;
