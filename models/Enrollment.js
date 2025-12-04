// models/Enrollment.js
const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student',required: [true, 'Student ID is required']},
  course: {type: mongoose.Schema.Types.ObjectId,ref: 'Course',required: [true, 'Course ID is required']},
  enrollmentDate: {
  type: Date,default: Date.now},
  progress: {type: Number, default: 0, min: [0, 'Progress cannot be negative'], max: [100, 'Progress cannot exceed 100']},
  status: {type: String,enum: ['active', 'completed', 'dropped'],default: 'active'}
}, {
  timestamps: true
});


enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);