const User = require("../models/userModel");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Salary = require("../models/Salary");
const Parent = require("../models/Parent");
const LateFee = require("../models/LateFees");
const Admission = require("../models/Admission");
const ClassFee = require("../models/ClassFee");
const Bank = require("../models/Bank");
const EntranceExam = require("../models/EntranceExam");
const FeeCategory = require("../models/FeeCategory");
const FeeReceipt = require("../models/FeeReceipt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Invalid username or password" });

    const isMatch = user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid username or password" });

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const student = new Student(req.body.formData);
    const savedStudent = await student.save();
    res.status(201).json({"Message":`The student has been created`});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

exports.getAllStudent = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
};



exports.addTeacher = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    const savedTeacher = await teacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllTeacher = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.isSalaryPaid = async (req, res) => {
  try {
    const isSalrayPaid = new Salary(req.body);
    const isSalrayPaidResult = await isSalrayPaid.save();
    res.status(200).json(isSalrayPaidResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSalaryDetails = async (req, res) => {
  try {
    const salaryDetails = await Salary.find();
    res.status(200).json(salaryDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addParentDetails = async (req, res) => {
  try {
    const parent = new Parent(req.body);
    const savedParent = await parent.save();
    res.status(201).json({ Meassage: "Parent add Success Fully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllParent = async (req, res) => {
  try {
    const allParent = await Parent.find();
    res.status(200).json(allParent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.LateFeeSchema = async (req, res) => {
  try {
    const lateFee = new LateFee(req.body);
    const savedLateFee = await lateFee.save();
    res.status(201).json({ Message: "Fees Update Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.AdmissionSchema = async (req, res) => {
  try {
    const admission = new Admission(req.body);
    const savedAdmission = await admission.save();
    res.status(201).json({ Message: "Admission Update Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllAdmission = async (req, res) => {
  try {
    const allAdmission = await Admission.find();
    res.status(200).json(allAdmission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.AdmissionReceipt = async (req, res) => {
  try {
    const admissionReceipt = new AdmissionReceipt(req.body);
    const savedAdmissionReceipt = await admissionReceipt.save();
    res.status(201).json({ Message: "Admission Receipt Update Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.ClassFee = async (req, res) => {
  try {
    const classFee = new ClassFee(req.body);
    const savedClassFee = await classFee.save();
    res.status(201).json({ Message: "Class Fee Update Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.Bank = async (req, res) => {
  try {
    const bank = new Bank(req.body);
    const savedBank = await bank.save();
    res.status(201).json({ Message: "Bank Update Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.Bank = async (req, res) => {
  try {
    const bank = await Bank.find();
    res.status(200).json(bank);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.AddEntranceExam = async (req, res) => {
  try {
    const entranceExam = new EntranceExam(req.body);
    const savedEntranceExam = await entranceExam.save();
    res.status(201).json({ Message: "Entrance Exam Update Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEntranceExam = async (req, res) => {
  try {
    const entranceExam = await EntranceExam.find();
    res.status(200).json(entranceExam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.FeeCategory = async (req, res) => {
  try {
    const feeCategory = new FeeCategory(req.body);
    const savedFeeCategory = await feeCategory.save();
    res.status(201).json({ Message: "Fee Category Update Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFeeCategory = async (req, res) => {
  try {
    const feeCategory = await FeeCategory.find();
    res.status(200).json(feeCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.FeeReceipt = async (req, res) => {
  try {
    const feeReceipt = new FeeReceipt(req.body);
    const savedFeeReceipt = await feeReceipt.save();
    res.status(201).json({ Message: "Fee Receipt Update Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFeeReceipt = async (req, res) => {
  try {
    const feeReceipt = await FeeReceipt.find();
    res.status(200).json(feeReceipt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


