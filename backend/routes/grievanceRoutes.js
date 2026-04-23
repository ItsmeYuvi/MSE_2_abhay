const express = require('express');
const router = express.Router();
const {
    createGrievance,
    getGrievances,
    getGrievanceById,
    updateGrievance,
    deleteGrievance,
    searchGrievances
} = require('../controllers/grievanceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/search', protect, searchGrievances);

router.route('/')
    .post(protect, createGrievance)
    .get(protect, getGrievances);

router.route('/:id')
    .get(protect, getGrievanceById)
    .put(protect, updateGrievance)
    .delete(protect, deleteGrievance);

module.exports = router;
