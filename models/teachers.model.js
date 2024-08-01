const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: String,
  subjects: [String],
  age: Number,
  gender: String,
  yearsOfExperience: Number,
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = { Teacher };
