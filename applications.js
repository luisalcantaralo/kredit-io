const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const {Application, validate} = require('../models/application');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const applications = await Application.find().sort('date');
  res.send(applications);
});

router.get('/:id', async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application) return res.status(404).send('The request with the given ID was not found.');
  res.send(application);
});

router.post('/',  async (req, res) => {

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let application = new Application({dateOfCreation:req.body.dateOfCreation, SAT:req.body.SAT, BURO:req.body.BURO, quantity:req.body.quantity, monthsToPay:req.body.monthsToPay,monthlyIncome:req.body.monthlyIncome, result:req.body.result});

  var promedio = (parseFloat(application.SAT)+parseFloat(application.BURO))/2;
  var percentage = 100*(parseFloat(application.monthlyIncome))/parseFloat(application.quantity);
  application.result = {};
  if(promedio >= 85 && percentage > 8.3){
    application.result.grade = 'A';
    application.result.payment = parseFloat(application.quantity)+0.25*parseFloat(application.quantity);
    application.result.options = [3,6,12,parseInt(application.monthsToPay)]
    application.result.interest = "25";

  }
  else if(promedio > 60 && percentage > 4.1){
    application.result.grade = 'B';
    application.result.payment = parseFloat(application.quantity)+0.29*parseFloat(application.quantity);
    
    if(parseInt(application.monthsToPay) <= 36){
      application.result.options = [12,parseInt(application.monthsToPay)]
    }
    else{
      application.result.options = [12]
    }
    application.result.interest = "29";

  }
  else if(promedio >= 45 && percentage > 2.1){
    application.result.grade = 'C';
    application.result.payment = 0.75*parseFloat(application.quantity)+0.35*parseFloat(application.quantity);
    application.result.options = [12,24];
    application.result.interest = "35";


  }
  else if(promedio < 45 && percentage < 2.1){
    application.result.grade = 'D';
  }
  console.log(promedio);
  console.log(percentage);

  console.log("New application submitted at " + new Date());
  console.log("Application: " + application)
  console.log("Result: " + application.result);
  console.log("-------------------------------------------");
  application = await application.save();
  
  res.send(application);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  if (!application) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

router.delete('/:id', [auth, admin],async (req, res) => {
  const application = await Application.findByIdAndRemove(req.params.id);

  if (!application) return res.status(404).send('The genre with the given ID was not found.');

  res.send(application);
});

module.exports = router;