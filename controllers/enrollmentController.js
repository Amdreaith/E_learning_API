// controllers/enrollmentController.js
const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');
const Course = require('../models/Course');

// CREATE ENROLLMENT
exports.createEnrollment = async (req, res, next) => {
  try {
    const { student, course } = req.body;

    // Check student exists
    const studentExists = await Student.findById(student);
    if (!studentExists) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    // Check course exists
    const courseExists = await Course.findById(course);
    if (!courseExists) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // Create enrollment
    const enrollment = await Enrollment.create(req.body);

    // Update student
    await Student.findByIdAndUpdate(student, {
      $addToSet: { enrolledCourses: course }
    });

    // Update course
    await Course.findByIdAndUpdate(course, {
      $inc: { enrollmentCount: 1 }
    });

    // Return populated enrollment
    const populatedEnrollment = await Enrollment.findById(enrollment._id)
      .populate('student', 'name email')
      .populate('course', 'title instructor price');

    res.status(201).json({
      success: true,
      data: populatedEnrollment
    });

  } catch (error) {
    next(error);
  }
};

// GET ALL ENROLLMENTS
exports.getAllEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('student', 'name email')
      .populate('course', 'title instructor price');

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });

  } catch (error) {
    next(error);
  }
};

// DELETE ENROLLMENT
exports.deleteEnrollment = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        error: 'Enrollment not found'
      });
    }

    // Update student
    await Student.findByIdAndUpdate(enrollment.student, {
      $pull: { enrolledCourses: enrollment.course }
    });

    // Update course
    await Course.findByIdAndUpdate(enrollment.course, {
      $inc: { enrollmentCount: -1 }
    });

    // Delete record
    await enrollment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Enrollment deleted successfully',
      data: {}
    });

  } catch (error) {
    next(error);
  }
};