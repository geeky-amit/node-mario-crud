const express = require("express");
const marioModel = require("../models/marioChar");

const marioRoute = express.Router();

marioRoute.post("/mario", (req, res) => {
  const { name, weight } = req.body;
  console.log(req.body);

  const mario = new marioModel({
    name: name,
    weight: weight
  });

  mario
    .save()
    .then((record) => {
      res.status(201).json({
        message: "Record created successfully",
        data: record
      });
    })
    .catch((err) => {
      res.status(500).json({
        errorDesc: "Failed to create a post!",
        error: err
      });
    });
});

marioRoute.get("/mario", async (req, res) => {
  try {
    const data = await marioModel.find();
    console.log(data);

    res.status(200).json({
      result: data
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed"
    });
  }
});

marioRoute.post("/mario/:id", (req, res) => {
  const id = req.params.id;

  marioModel
    .findById(id)
    .then((data) => {
      res.status(200).json({
        result: data
      });
    })
    .catch((error) => {
      res.status(500).json({
        errorMessage: "failed!"
      });
    });
});

marioRoute.delete("/mario/:id", (req, res) => {
  const marioId = req.params.id;
  marioModel
    .deleteOne({ _id: marioId })
    .then((response) => {
      if (response.deletedCount) {
        res.status(200).json({
          message: "Mario deleted successfully",
          data: response
        });
      } else {
        res.status(404).json({
          message: "could not found Mario to delete"
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errorDesc: "Failed to delete the Mario!",
        error: err
      });
    });
});

marioRoute.put("/mario/:id", (req, res) => {
  const marioId = req.params.id;
  const updatedMario = req.body;

  marioModel
    .findOneAndUpdate(
      {
        _id: marioId
      },
      updatedMario
    )
    .then((response) => {
      res.status(200).send({
        message: "Post updated successfully",
        result: response
      });
    })
    .catch((err) => {
      res.status(500).json({
        errorDesc: "Failed to update a post!",
        error: err
      });
    });
});

module.exports = marioRoute;
