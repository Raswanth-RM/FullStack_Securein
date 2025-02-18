import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import EmployeeTable from "./components/EmployeeTable";

function App() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Employee Directory
        </Typography>
        <EmployeeTable />
      </Paper>
    </Container>
  );
}

export default App;
