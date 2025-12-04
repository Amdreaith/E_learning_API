// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
   name: {type: String,required: [true, 'Student name is required'], maxlength: [100, 'Name cannot exceed 100 characters']},
   email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']},
   phone: { type: String, match: [/^[\d\s\-\+\(\)]+$/, 'Please provide a valid phone number']},
   enrolledCourses: [{type: mongoose.Schema.Types.ObjectId,ref: 'Course'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

studentSchema.index({ name: 'text', email: 'text' });

module.exports = mongoose.model('Student', studentSchema);