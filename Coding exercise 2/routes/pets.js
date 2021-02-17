const express = require('express'); 
const Joi = require('@hapi/joi');

const Pet = require('../models/pets');

const router = express.Router();
let validateDelete = (req, res, next) => {
  let petId = req.body.id;
  if(!petId){
    return res.status(200).json({
      status: "false",
      message: "please enter proper id",
      data: null,
    });
  }
  next();
}
let validateCreate = (req, res, next) => {
  let name = req.body.name;
  let age = parseInt(req.body.age);
  let colour = req.body.colour;
  if(!name){
    return res.status(200).json({
      status: "false",
      message: "please enter pet name",
      data: null,
    });
  }
  if(!age){
    return res.status(200).json({
      status: "false",
      message: "please enter proper pet age",
      data: null,
    });
  }
  if(!colour){
    return res.status(200).json({
      status: "false",
      message: "please enter pet colour",
      data: null,
    });
  }
  next();
}

//url: localhost:8000/pets/create
//data: { "name":"Lilli", "age":"3", "colour":"Red" }
router.post(
    '/create',
    validateCreate,
    async (req, res, next) => {
      try {
        const pet = new Pet(req.body);
        await pet.save();
        res.status(201).json(pet);
      } catch (e) {
        next(e);
      }
    }
  );

  //url: localhost:8000/pets/get
  router.get(
    '/get',
    async (req, res, next) => {
      try {
        const pet = await Pet.find();
        res.status(201).json(pet);
      } catch (e) {
        next(e);
      }
    }
  );
//url: localhost:8000/pets/delete
//data: {"id":"602d7caa4f9b66075018123b"}
  router.post(
    '/delete',
    validateDelete,
    async (req, res, next) => {
      try {
        let petid = req.body.id;
        await Pet.findByIdAndDelete(petid);
        res.status(200).json({
          status: "success",
          message: "deleted successfully",
        });
      } catch (err) {
        res.status(200).json({
          status: "false",
          message: "fail to delete",
          data: null,
        });
      }
    }
  );
  
  module.exports = router;