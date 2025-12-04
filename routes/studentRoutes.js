const express = require("express");
const router = express.Router();

const {
  createStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  searchStudents 
} = require("../controllers/studentController");

const { validateStudent } = require("../middleware/validateInput");







router.get("/search", searchStudents);


router.post("/", validateStudent, createStudent);


router.get("/", getAllStudents);


router.get("/:id", getStudent);


router.put("/:id", validateStudent, updateStudent);


router.delete("/:id", deleteStudent);








module.exports = router;
