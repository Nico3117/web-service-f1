const express = require('express');
const router = express.Router(); // router intégré au framework

// import des controllers
const userCtrl = require('../controllers/user');

// Routes
router.get('/users', userCtrl.getUsers);
router.get('/users/:id', userCtrl.getUserById);
router.post('/users', userCtrl.createUser);
router.put('/users/:id', userCtrl.updateUser);
router.delete('/users/:id', userCtrl.deleteUser);

module.exports = router;