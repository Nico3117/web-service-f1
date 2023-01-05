const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getUsers = (req, res) => {
    User.find()
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(400).json('Error: ' + err));
};
  
exports.getUserById = (req, res) => {
    User.findById(req.params.id)
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(400).json('Error: ' + err));
};

exports.createUser = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const email = req.body.email;
            const password = hash;
            const name = req.body.name;
            const creationDate = Date.now();
            const active = false;
          
            const newUser = new User({
              email,
              password,
              name,
              creationDate,
              active
            });
          
            newUser.save()
              .then((saved) => res.status(200).json(saved))
              .catch((err) => res.status(500).json('Error: ' + err));
        })
        .catch((err) => res.status(500).json('Error: ' + err));
};

exports.updateUser = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            req.body.modificationDate = new Date();

            User.updateOne({ _id: user.id}, req.body)
                .then((result) => res.status(200).json(result))
                .catch((err) => res.status(500).json('Error: ' + err))
        })
        .catch((err) => res.status(404).json('Error: ' + err))
};

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((result) => {
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(500).json({message: 'ALREADY DELETED'})
        }
        })
        .catch((err) => {
            res.status(400).json({message: 'NOT FOUND', error: err})
        })
};