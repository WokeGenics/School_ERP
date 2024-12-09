const express = require("express");
const { login, addStudent, isSalaryPaid,getAllAdmission, getAllTeacher, getFeeReceipt, FeeReceipt, getFeeCategory, getEntranceExam, FeeCategory, AddEntranceExam, ClassFee, getSalaryDetails, AdmissionReceipt, Bank, getAllStudent , addParentDetails, getAllParent, LateFeeSchema, AdmissionSchema } = require("../Controllers/authController");
const router = express.Router();

// get request
router.get('/get-AllAdmission', getAllAdmission)

router.get("/getAllTeacher", getAllTeacher);
router.get("/detail-salary", getSalaryDetails);
router.get("/getAllParent", getAllParent);
router.get('/Bank', Bank);
router.get('/get-EntranceExam', getEntranceExam);
router.get('/get-Fee-Category', getFeeCategory);
router.get('/Fee-Receipt', getFeeReceipt)


// post request 
router.post("/login", login);
router.post("/addStudent", addStudent);
router.post("/cr-salary", isSalaryPaid);
router.post("/addParentDetails", addParentDetails);
router.post('/LateFee-Schema', LateFeeSchema);
router.post('/add-admistion', AdmissionSchema);
router.post('/Admission-Receipt', AdmissionReceipt);
router.post('/Class-Fee', ClassFee);
router.post('/add-Bank', Bank);
router.post('/Add-Entrance-Exam', AddEntranceExam);
router.post('/Fee-Category', FeeCategory);
router.post('/Fee-Receipt', FeeReceipt);


module.exports = router;
