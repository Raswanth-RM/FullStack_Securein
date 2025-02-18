import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const EmployeeFormDialog = ({ open, handleClose, fetchEmployees, selectedEmployee }) => {
  const [employee, setEmployee] = useState({
    name: "",
    age: "",
    dob: "",
    gender: "",
    department: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    dob: false,
    gender: false,
    department: false,
  });

  useEffect(() => {
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
    } else {
      setEmployee({ name: "", age: "", dob: "", gender: "", department: "" });
    }
  }, [selectedEmployee]);

  // Function to calculate age based on DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs); // Date object calculates age
    return Math.abs(ageDate.getUTCFullYear() - 1970); // Get age
  };

  const handleDobChange = (e) => {
    const dob = e.target.value;
    setEmployee({ ...employee, dob: dob, age: calculateAge(dob) }); // Automatically update age
  };

  const handleSubmit = async () => {
    // Check for validation
    const newErrors = {
      name: !employee.name,
      dob: !employee.dob,
      gender: !employee.gender,
      department: !employee.department,
    };

    setErrors(newErrors);

    // If any field is missing, do not submit
    if (Object.values(newErrors).includes(true)) {
      return;
    }

    // Submit the form
    if (selectedEmployee) {
      await axios.put(`http://127.0.0.1:8000/employees/${selectedEmployee.id}`, employee);
    } else {
      await axios.post("http://127.0.0.1:8000/employees", employee);
    }

    fetchEmployees();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{selectedEmployee ? "Edit Employee" : "Add Employee"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          style={{ marginBottom: 10 }}
          error={errors.name}
        />
        <TextField
          label="DOB"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }} // Ensures label doesn't overlap with value
          value={employee.dob}
          onChange={handleDobChange} // Update age when DOB changes
          style={{ marginBottom: 10 }}
          error={errors.dob}
        />
        <TextField
          label="Age"
          fullWidth
          value={employee.age}
          onChange={(e) => setEmployee({ ...employee, age: e.target.value })}
          style={{ marginBottom: 10 }}
          disabled // Prevent user from editing manually
        />
        
        {/* Gender dropdown */}
        <FormControl fullWidth style={{ marginBottom: 10 }} error={errors.gender}>
          <InputLabel>Gender</InputLabel>
          <Select
            value={employee.gender}
            onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
            label="Gender"
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Department"
          fullWidth
          value={employee.department}
          onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
          style={{ marginBottom: 10 }}
          error={errors.department}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeFormDialog;
