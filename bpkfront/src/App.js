// App.js
import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux'
import { getAllStudent, postStudent } from './Redux/action';

const App = () => {


  const data= useSelector((state)=>state.reducer.Student.Students)

const dispatch=useDispatch()
useEffect(()=> {
dispatch(getAllStudent())
} , [dispatch])

  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    major: '',
    enrollmentDate: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
   
  };

  const addStudent = async () => {
    if (
      formData.name &&
      formData.studentId &&
      formData.major &&
      formData.enrollmentDate
    ) {
      setStudents([...students, formData]);

  await dispatch(postStudent( formData ))

 await  dispatch(getAllStudent())
      console.log(formData)
      setFormData({
        name: '',
        studentId: '',
        major: '',
        enrollmentDate: '',
      });
    } else {
      alert('Please fill in all fields');
      
    }
  };

  const editStudent = (index) => {
    const editedStudent = students[index];
    setFormData(editedStudent);
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  const deleteStudent = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  return (
    <div>
     <form style={{ maxWidth: '400px', margin: 'auto',marginTop:"50x" , padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
  
  <TextField
    label="Name"
    name="name"
    value={formData.name}
    onChange={handleInputChange}
    style={{ marginBottom: '15px', width: '100%' }}
  />
  <TextField
    label="Student ID"
    name="studentId"
    value={formData.studentId}
    onChange={handleInputChange}
    style={{ marginBottom: '15px', width: '100%' }}
  />
  <TextField
    label="Major"
    name="major"
    value={formData.major}
    onChange={handleInputChange}
    style={{ marginBottom: '15px', width: '100%' }}
  />
  <TextField
    
    type="date"
    name="enrollmentDate"
    value={formData.enrollmentDate}
    onChange={handleInputChange}
    style={{ marginBottom: '15px', width: '100%' }}
  />
  <Button
    variant="contained"
    color="primary"
    onClick={addStudent}
    style={{ width: '100%', backgroundColor: '#1da1f2', color: '#ffffff' }}
  >
    Submit
  </Button>
</form>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow color="pink">
              <TableCell>Name</TableCell>
              <TableCell>Student ID</TableCell>
              <TableCell>Major</TableCell>
              <TableCell>Enrollment Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{student.major}</TableCell>
                <TableCell>{student.enrollmentDate}</TableCell>
                <TableCell>
                  <Button onClick={() => editStudent(index)}>Edit</Button>
                  <Button onClick={() => deleteStudent(index)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
