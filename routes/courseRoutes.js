const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  searchCourses
} = require("../controllers/courseController");

const { validateCourse } = require("../middleware/validateInput");






router.get("/search", searchCourses);

router.post("/", validateCourse, createCourse);

router.get("/", getAllCourses);


router.get("/:id", getCourse);


router.put("/:id", validateCourse, updateCourse);


router.delete("/:id", deleteCourse);





module.exports = router;
