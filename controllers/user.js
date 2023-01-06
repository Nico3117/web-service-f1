const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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
            const active = true;
          
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

exports.loginUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return res.status(500).json('Error: ' + err);
                    }
                    if (result) {
                        const token = jwt.sign( { id: user.id, email: user.email }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h'});
                        res.json({message: 'User connecte !', token});
                    } else {
                        res.status(400).json('Error: Email or password is incorrect');
                    }
                });
            } else {
                res.status(400).json('Error: Email or password is incorrect');
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
};