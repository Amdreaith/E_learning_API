const express = require("express");
const router = express.Router();

const {
  createEnrollment,
  getAllEnrollments,
  deleteEnrollment
} = require("../controllers/enrollmentController");

const { validateEnrollment } = require("../middleware/validateInput");






router.get("/", getAllEnrollments);


router.post("/", validateEnrollment, createEnrollment);


router.delete("/:id", deleteEnrollment);





module.exports = router;
