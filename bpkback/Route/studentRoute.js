import express from "express";
import {
  AddStudent,
  deleteStudent,
  EditStudent,
  getAllStudent,
} from "../Controller/StudentController.js";



const router = express.Router();

router.route("/student").get(getAllStudent);

router.route("/addstudent").post(AddStudent);
router.route("/editstudent").put(EditStudent);
router.route("/deletestudent").delete(deleteStudent);

export default router;
