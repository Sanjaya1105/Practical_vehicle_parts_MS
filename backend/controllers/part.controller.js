const Part = require('../models/part.model');

// Create a new part
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const part = new Part({
    name: req.body.name,
    partType: req.body.partType,
    brand: req.body.brand,
    quantityInStock: req.body.quantityInStock,
    price: req.body.price,
    status: req.body.status
  });

  Part.create(part, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Part."
      });
    else res.send(data);
  });
};

// Retrieve all parts
exports.findAll = (req, res) => {
  Part.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving parts."
      });
    else res.send(data);
  });
};

// Find a single part with an id
exports.findOne = (req, res) => {
  Part.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Part with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Part with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a part
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Part.updateById(
    req.params.id,
    new Part(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Part with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Part with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a part
exports.delete = (req, res) => {
  Part.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Part with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Part with id " + req.params.id
        });
      }
    } else res.send({ message: `Part was deleted successfully!` });
  });
}; 