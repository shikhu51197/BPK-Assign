import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudent, postStudent, deleteStudent, editStudent1 } from "./Redux/action"; 
import { useEffect, useState } from "react";


const App = () => {
  const data = useSelector((state) => state.reducer.Student.Students);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStudent());
  }, [dispatch]);

  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    major: "",
    enrollmentDate: "",
  });
  const [editformData, setEditFormData] = useState({
    name: "",
    studentId: "",
    major: "",
    enrollmentDate: "",
  });
  const [selectedStudent, setSelectedStudent] = useState(null);

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

      await dispatch(postStudent(formData));
      await dispatch(getAllStudent());

      setFormData({
        name: "",
        studentId: "",
        major: "",
        enrollmentDate: "",
      });
    } else {
      alert("Please fill in all fields");
    }
  };

  const editStudent = (studentId) => {
    const selectedStudent = data.find((student) => student._id === studentId);

    if (selectedStudent) {
      setSelectedStudent(selectedStudent);
      setEditFormData({
        name: selectedStudent.name,
        studentId: selectedStudent.studentId,
        major: selectedStudent.major,
        enrollmentDate: selectedStudent.enrollmentDate,
      });

      onOpen();
    } else {
      console.error("Selected student not found");
    }
  };

  const deleteStudent1 = async(id) => {
     
    try {
      await dispatch(deleteStudent(id));

     await dispatch(getAllStudent())
    } catch (error) {
      console.error("Error uploading media:", error);
    }

  };

  const updateStudent = async () => {
   
    console.log(editformData.enrollmentDate)
    if (selectedStudent) {
      // Dispatch the action to update the student data

      await dispatch(editStudent1(selectedStudent._id, editformData.name , editformData.enrollmentDate , editformData.studentId , editformData.major));
      // Fetch the updated data after editing
      await dispatch(getAllStudent());
      // Close the modal and reset the state
      onClose();
      setSelectedStudent(null);
    } else {
      console.error("Selected student not found");
    }
  };

  return (
    <Box >
      <form
        style={{
          maxWidth: "600px",
          margin: "auto",
          marginTop: "50px",
          padding: "20px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >

      <Heading  textAlign="center" size="lg">Add Student Form </Heading>
        <FormControl mb="15px"  mt="35px">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl mb="15px"  mt="15px">
          <FormLabel>Student ID</FormLabel>
          <Input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl mb="15px"  mt="15px">
          <FormLabel>Major</FormLabel>
          <Input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl mb="15px"  mt="15px">
          <FormLabel>Enrollment Date</FormLabel>
          <Input
            type="date"
            name="enrollmentDate"
            value={formData.enrollmentDate}
            onChange={handleInputChange}
          />
        </FormControl>

        <Button
         mt="15px"
          colorScheme="twitter"
          onClick={addStudent}
          style={{ width: "100%" }}
        >
          Submit
        </Button>
      </form>
      <Modal isOpen={isOpen} onClose={() => { onClose(); setSelectedStudent(null); }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl mb="15px">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={editformData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editformData, name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mb="15px">
                <FormLabel>Student ID</FormLabel>
                <Input
                  type="text"
                  name="studentId"
                  value={editformData.studentId}
                  onChange={(e) =>
                    setEditFormData({
                      ...editformData,
                      studentId: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb="15px">
                <FormLabel>Major</FormLabel>
                <Input
                  type="text"
                  name="major"
                  value={editformData.major}
                  onChange={(e) =>
                    setEditFormData({ ...editformData, major: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mb="15px">
                <FormLabel>Enrollment Date</FormLabel>
                <Input
                  type="date"
                  name="enrollmentDate"
                  value={editformData.enrollmentDate}
                  onChange={(e) =>
                    setEditFormData({
                      ...editformData,
                      enrollmentDate: e.target.value,
                    })
                  }
                />
              </FormControl>

             
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => { onClose(); setSelectedStudent(null); }}>
              Close
            </Button>
            <Button
              colorScheme="green"
              onClick={updateStudent}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Table variant="simple"  color='blue' w="80%" border="2px solid black"  borderRadius={50} m="auto" mt="100px" mb="30px">
        <Thead bgcolor="pink" >
          <Tr>
            <Th>Name</Th>
            <Th>Student ID</Th>
            <Th>Major</Th>
            <Th>Enrollment Date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((student, index) => (
              <Tr key={student._id}>
                <Td>{student.name}</Td>
                <Td>{student.studentId}</Td>
                <Td>{student.major}</Td>
                <Td>{student.enrollmentDate}</Td>
                <Td>
                  <Button onClick={() => editStudent(student._id)}  colorScheme="yellow">Edit</Button>
                  <Button ml="20px" onClick={() => deleteStudent1(student._id)}  colorScheme="red">
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default App;