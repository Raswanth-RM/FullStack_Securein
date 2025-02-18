from fastapi import FastAPI, HTTPException
from tinydb import TinyDB, Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
db = TinyDB("database.json")
Employee = Query()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Employee Model
class EmployeeModel(BaseModel):
    name: str
    age: int
    dob: str
    gender: str
    department: str


@app.get("/")
def read_root():
    return {"message": "Welcome to the Employee Management API"}


# Get all employees
@app.get("/employees")
def get_employees():
    employees = db.all()
    return employees if employees else []

# Add employee
@app.post("/employees")
def create_employee(emp: EmployeeModel):
    db.insert(emp.dict())
    return {"message": "Employee added successfully"}

# Update employee
@app.put("/employees/{emp_id}")
def update_employee(emp_id: int, emp: EmployeeModel):
    if db.contains(doc_id=emp_id):
        db.update(emp.dict(), doc_ids=[emp_id])
        return {"message": "Employee updated successfully"}
    raise HTTPException(status_code=404, detail="Employee not found")


# Delete employee
@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: int):
    if db.contains(doc_id=emp_id):
        db.remove(doc_ids=[emp_id])
        return {"message": "Employee deleted successfully"}
    raise HTTPException(status_code=404, detail="Employee not found")