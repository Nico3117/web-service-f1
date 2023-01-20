const Circuit = require('../models/circuit');
const logger = require("../logger");

exports.getCircuits = (req, res) => {
    Circuit.find()
        .then((circuits) => res.status(200).json(circuits))
        .then(logger.info(`Récupération des circuits`))
        .catch((err) => res.status(400).json('Error: ' + err))
        .catch(logger.error(`Erreur getCircuits`));
};

exports.getCircuitById = (req, res) => {
    Circuit.findById(req.params.id)
        .then((circuit) => res.status(200).json(circuit))
        .then(logger.info(`Récupération du circuit`))
        .catch((err) => res.status(400).json('Error: ' + err))
        .catch(logger.error(`Erreur getCircuitById`));
};

exports.createCircuit = (req, res) => {
    const name = req.body.name;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const creationDate = Date.now();
    const active = true;
    
    const newCircuit = new Circuit({
        name,
        latitude,
        longitude,
        creationDate,
        active
    });
    
    newCircuit.save()
        .then((saved) => res.status(200).json(saved))
        .then(logger.info(`Création circuit:`))
        .catch((err) => res.status(500).json('Error: ' + err))
        .catch(logger.error(`Erreur createCircuit:`));
};

exports.updateCircuit = (req, res) => {
    Circuit.findById(req.params.id)
        .then((circuit) => {
            req.body.modificationDate = new Date();

            Circuit.updateOne({ _id: circuit.id}, req.body)
                .then((result) => res.status(200).json(result))
                .catch((err) => res.status(500).json('Error: ' + err))
        })
        .then(logger.info(`Création circuit`))
        .catch((err) => res.status(404).json('Error: ' + err))
        .catch(logger.error(`Erreur updateCircuit:`));
};

exports.deleteCircuit = (req, res) => {
    Circuit.findByIdAndDelete(req.params.id)
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