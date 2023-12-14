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
router.route("/editstudent/:_id").put(EditStudent);
router.route("/deletestudent/:_id").delete(deleteStudent);

export default router;
