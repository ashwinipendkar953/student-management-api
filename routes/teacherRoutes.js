const express = require("express");
const router = express.Router();

const { Teacher } = require("../models/teachers.model");

router.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/teachers", async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.put("/teachers/:id", async (req, res) => {
  const teacherId = req.params.id;
  const dataToUpdate = req.body;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      dataToUpdate,
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    res.status(201).json(updatedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/teachers/:id", async (req, res) => {
  const teacherId = req.params.id;
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
    if (!deletedTeacher) {
      return res.status(404).json({ error: "Teacher not found." });
    }

    res.status(200).json({
      message: "Teacher deleted successfuly.",
      teacher: deletedTeacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
