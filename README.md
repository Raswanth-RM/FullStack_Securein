# Employee Directory (Full Stack Assessment)

## Overview
This is an Employee Directory application built using **React.js** for the frontend and **FastAPI** for the backend, with **TinyDB** as the database. The application allows users to manage employee records by adding, editing, deleting, searching, and filtering employees.

## Tech Stack

### Frontend
- **React JS** (Functional Components with Hooks)
- **Material UI** (for UI Components)
- **ESBuild** (as the build tool)

### Backend
- **Python 3**
- **FastAPI**
- **TinyDB** (as the database)

---

## Features
- Display all employees in a data table
- Show "No Result Found" message when no employees are available
- Add Employee:
  - Name
  - Age
  - DOB
  - Gender
  - Department
- Edit Employee
- Delete Employee (with confirmation dialog)
- API integration using Axios for CRUD operations
- CORS enabled for frontend-backend communication

---

## Additional Features
- Dynamic age calculation based on date of birth
- Built an interactive employee data grid with MUI that allows sorting and filtering across all employee attributes

---

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (for running the React frontend)
- **Python 3** (for running the FastAPI backend)
- **pip** (for installing Python dependencies)

### Clone the Repository
```sh
git clone https://github.com/yourusername/FullStack_Securein.git
cd FullStack_Securein
```

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install fastapi uvicorn tinydb pydantic
   ```
4. Run the FastAPI server:
   ```sh
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`
   
   You can see all the employees at `http://localhost:8000/employees`

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

---

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/employees` | Fetch all employees |
| POST | `/employees` | Add a new employee |
| PUT | `/employees/{id}` | Update an employee by ID |
| DELETE | `/employees/{id}` | Delete an employee by ID |


---
## Output
1. Initially, when there are no records present:
   
![No_Records](https://github.com/user-attachments/assets/2133a907-85c5-4870-9c74-a7767fefd612)

2. DialogBox to Add/Edit record (with validation):
   
![DialogBox](https://github.com/user-attachments/assets/90e490b4-3b10-4c50-8b0b-33f7d180a2e9)

3. Added two record:

![Adding_Records](https://github.com/user-attachments/assets/60cdb286-c6c2-405b-9231-a6a4db6175f3)

4. Added more records (Table sorting and filtering options are available):

![More_Records](https://github.com/user-attachments/assets/04b71769-8502-444d-85c2-39d8c5417b30)

5.Edited the first record:

![Edited](https://github.com/user-attachments/assets/09d8c83a-641b-406a-8ecd-bea339d53f2e)

6. Delete confirmation Dialogbox:

![Deletion](https://github.com/user-attachments/assets/29876abd-d516-4b5e-838e-1103ec53ab3d)

7. Deleted the first reecord:

![AfterDeletion](https://github.com/user-attachments/assets/706d9ae4-e71b-425b-85c5-ebefee61a113)


---


## Notes
- The backend uses **TinyDB** for lightweight storage, making it easy to manage data without needing a full database setup.
- The frontend communicates with the backend using **Axios**.
- **Search and filtering** features have been implemented in the UI.
- **CORS** is enabled in FastAPI to allow frontend-backend communication.
- The UI is built using **Material UI** for a modern look.

---

## Future Enhancements
- Migrate database from TinyDB to PostgreSQL/MySQL for better scalability.
- Improve authentication & role-based access control.

---

## License
This project is open-source and available under the [MIT License](LICENSE).

---

## Author
Developed by Raswanth(https://github.com/Raswanth-RM).



