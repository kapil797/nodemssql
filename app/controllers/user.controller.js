const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
console.log('User',User);

exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
      console.log('hi req body');
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    console.log('hi');
    // Create a Tutorial
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    // Save Tutorial in the database
    User.create(user)
      .then(data => {
        res.send(data);
        console.log('user',data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };

exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  exports.findOne=(req,res)=>{
    const id = req.params.id;

    User.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  }

  exports.update = (req, res) => {
    const id = req.params.id;
  
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    console.log("nononum");
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          console.log("num");
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };