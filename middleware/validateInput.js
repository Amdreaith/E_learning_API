const sendValidationError = (res, errors) => {
  return res.status(400).json({
    success: false,
    error: "Validation Error",
    details: errors,
  });
};


// Student Validation

const validateStudent = (req, res, next) => {
  const { name, email } = req.body;
  const errors = [];

  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("Name is required");
  }

  if (!email || typeof email !== "string" || email.trim() === "") {
    errors.push("Email is required");
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("Invalid email format");
  }

  if (errors.length > 0) return sendValidationError(res, errors);

  next();
};


// Course Validation

const validateCourse = (req, res, next) => {
  const { title, description, instructor, duration, price } = req.body;
  const errors = [];

  if (!title || title.trim() === "") {
    errors.push("Title is required");
  }

  if (!description || description.trim() === "") {
    errors.push("Description is required");
  }

  if (!instructor || instructor.trim() === "") {
    errors.push("Instructor name is required");
  }

  if (duration === undefined || isNaN(duration) || Number(duration) <= 0) {
    errors.push("Duration must be a positive number");
  }

  if (price === undefined || isNaN(price) || Number(price) < 0) {
    errors.push("Price must be zero or a positive number");
  }

  if (errors.length > 0) return sendValidationError(res, errors);

  next();
};


// Enrollment Validation

const validateEnrollment = (req, res, next) => {
  const { student, course } = req.body;
  const errors = [];

  if (!student || typeof student !== "string") {
    errors.push("Student ID is required");
  }

  if (!course || typeof course !== "string") {
    errors.push("Course ID is required");
  }

  if (errors.length > 0) return sendValidationError(res, errors);

  next();
};

module.exports = {
  validateStudent,
  validateCourse,
  validateEnrollment,
};