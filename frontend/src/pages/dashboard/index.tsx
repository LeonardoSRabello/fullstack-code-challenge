import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardActionArea } from "@mui/material";
import { GroupOutlined, HelpOutline } from "@mui/icons-material";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography
        variant="h3"
        color="primary"
        textAlign="center"
        sx={{ py: 4 }}
      >
        Welcome to the Limbic Full Stack Code Challenge!
      </Typography>
      <Grid
        container
        spacing={8}
        sx={{ maxWidth: 860, width: "100%", mx: "auto" }}
      >
        <Grid item xs={12} sm={6}>
          <Card>
            <CardActionArea onClick={() => navigate("/users")}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  p: 2
                }}
              >
                <GroupOutlined
                  color="primary"
                  sx={{ width: 240, height: 240 }}
                />
                <Typography fontSize={48} fontWeight="bold" color="primary">
                  Users
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardActionArea onClick={() => navigate("/questions")}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  p: 2
                }}
              >
                <HelpOutline color="primary" sx={{ width: 240, height: 240 }} />
                <Typography fontSize={48} fontWeight="bold" color="primary">
                  Questions
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
