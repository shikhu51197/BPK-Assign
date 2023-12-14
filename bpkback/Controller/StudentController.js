import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import { Student } from "../Model/Student.js";
import ErrorHandler from "../utils/errorHandler.js";


export const getAllStudent = catchAsyncError(async (req, res, next) => {
  const { search } = req.query;
  let query = {};

  if (search) {
    query = {
      $or: [
        { name: { $regex: new RegExp(search, 'i') } },
        { studentId: { $regex: new RegExp(search, 'i') } },
        { major: { $regex: new RegExp(search, 'i') } },
        { enrollmentDate: { $regex: new RegExp(search, 'i') } },
      ],
    };
  }
 
    const Students= await Student.find();
  
    res.status(200).json({
      success: true,
      Students,
    });

});


export const AddStudent= catchAsyncError(async (req, res, next) => {
  const { name, studentId, major, enrollmentDate } = req.body;
  if (!name || !studentId || !major || !enrollmentDate) {
    return next(new ErrorHandler("All fields are required.", 400));
  }

  const StudentDetails = new Student({
    name, studentId, major, enrollmentDate
  });

  const savedStudent = await StudentDetails.save();

  res.status(201).json({
    success: true,
    contact: savedStudent,
  });

  
  });
  export const EditStudent = catchAsyncError(async (req, res, next) => {
    const {_id} = req.params
    const { name, studentId, major, enrollmentDate } = req.body;


  
    if (!_id || !name || !studentId || !major || !enrollmentDate) {
      return next(new ErrorHandler("Please provide all details.", 400));
    }
  
    const studentdata = await Student.findById(_id);
  
    if (!studentdata) {
      return next(new ErrorHandler("Student not found.", 404));
    }
  
    // Update contact details
    studentdata.name = name;
    studentdata.major = major;
    studentdata.studentId = studentId;
    studentdata.enrollmentDate = enrollmentDate;
  
    await studentdata.save();
  
    res.status(200).json({
      success: true,
      message: "Student details updated successfully.",
      updatedStudentdetails: studentdata,
    });
  });
  

 
export const deleteStudent = catchAsyncError(async (req, res, next) => {

    const  {_id}  = req.params;
 
  
    const deletedStudent = await Student.findByIdAndDelete(_id);
  
    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
  
    res.status(200).json({
      success: true,
      Student: "Deleted Student",
    });
  });


