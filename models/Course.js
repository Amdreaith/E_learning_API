// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {type: String, required: [true, 'Course title is required'],trim: true, maxlength: [200, 'Title cannot exceed 200 characters']},
  description: {type: String, required: [true, 'Course description is required'], maxlength: [2000, 'Description cannot exceed 2000 characters']},
  instructor: {type: String,required: [true, 'Instructor name is required'],},
  duration: {type: Number, required: [true, 'Course duration is required'],min: [1, 'Duration must be at least 1 hour']},
  price: {type: Number,required: [true, 'Course price is required'],min: [0, 'Price cannot be negative']},
  category: {type: String,enum: ['Programming', 'Design', 'Business', 'Marketing', 'Personal Development', 'Technology','Other'],default: 'Other'},
  level: {type: String,enum: ['Beginner', 'Intermediate', 'Advanced'],default: 'Beginner'},
  isActive: {
    type: Boolean,
    default: true
  },
  enrollmentCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true 
});


courseSchema.index({ title: 'text', description: 'text', instructor: 'text' });

module.exports = mongoose.model('Course', courseSchema);
