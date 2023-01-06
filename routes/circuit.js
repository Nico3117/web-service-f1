const express = require('express');
const router = express.Router(); // router intégré au framework

// import des middlewares
const auth = require('../middlewares/auth');

// import des controllers
const circuitCtrl = require('../controllers/circuit');

// Routes
router.get('/', [auth], circuitCtrl.getCircuits);
router.get('/:id', [auth], circuitCtrl.getCircuitById);
router.post('/', [auth], circuitCtrl.createCircuit);
router.put('/:id', [auth], circuitCtrl.updateCircuit);
router.delete('/:id', [auth], circuitCtrl.deleteCircuit);

module.exports = router;