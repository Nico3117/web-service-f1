const mongoose = require('mongoose');

const circuitSchema = mongoose.Schema({
    name: {type: String, required: true},
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    creationDate: {type: Date, required: false},
    modificationDate: {type: Date, required: false},
    active: {type: Boolean, required: false}
});

module.exports = mongoose.model('Circuit', circuitSchema);