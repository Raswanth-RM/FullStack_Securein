import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Button, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import EmployeeFormDialog from "./EmployeeFormDialog";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // State to control confirmation dialog
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // State to store employee to delete

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get("http://127.0.0.1:8000/employees");
    setEmployees(response.data.map((emp, index) => ({ id: index + 1, ...emp })));
  };

  const handleAdd = () => {
    setSelectedEmployee(null);
    setOpen(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleDelete = (emp_id) => {
    setEmployeeToDelete(emp_id); // Set the employee to delete
    setOpenConfirmDialog(true); // Open the confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/employees/${employeeToDelete}`);
      fetchEmployees();
      setOpenConfirmDialog(false); // Close the confirmation dialog
    } catch (error) {
      console.error("Error deleting employee:", error);
      setOpenConfirmDialog(false); // Close the dialog in case of an error
    }
  };

  const cancelDelete = () => {
    setOpenConfirmDialog(false); // Close the dialog without deleting
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "age", headerName: "Age", type: "number", width: 100 },
    { field: "dob", headerName: "DOB", width: 150 },
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "department", headerName: "Department", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add Employee
        </Button>
      </div>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={employees}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          sx={{ border: 0 }}
        />
      </Paper>

      {/* Employee Form Dialog */}
      <EmployeeFormDialog
        open={open}
        handleClose={() => setOpen(false)}
        fetchEmployees={fetchEmployees}
        selectedEmployee={selectedEmployee}
      />

      {/* Confirmation Dialog for Deleting Employee */}
      <Dialog open={openConfirmDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this employee?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeTable;
