const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const validateCar = require("../middleware/carValidate");

const authenticateToken = require("../middleware/authMiddleware");

router.get('/', authenticateToken, carController.getAllCars);

router.get('/:id', carController.getCarById);

router.post('/', authenticateToken, validateCar, carController.createCar);

router.put('/:id', authenticateToken, validateCar, carController.updateCar);

router.delete('/:id', carController.deleteCar)

module.exports = router;