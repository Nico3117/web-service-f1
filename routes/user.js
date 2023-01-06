const express = require('express');
const router = express.Router(); // router intégré au framework

// import des controllers
const userCtrl = require('../controllers/user');

// Routes
router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.getUserById);
router.post('/signup', userCtrl.createUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);
router.post('/login', userCtrl.loginUser);

module.exports = router;