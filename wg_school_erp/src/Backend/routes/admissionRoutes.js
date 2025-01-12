const express = require('express');
const {createAdmission, getAdmissions,getAdmissionById,updateAdmission, deleteAdmission,getAllAdmissions } = require('../Controllers/admissionController');

const router = express.Router();
router.post('/admissions', createAdmission);
router.get('/admissions', getAdmissions);
router.get('/admissions/:id', getAdmissionById);
router.put('/admissions/:id', updateAdmission);
router.delete('/admissions/:id', deleteAdmission);
router.get('/admissions', getAllAdmissions);

module.exports = router;
