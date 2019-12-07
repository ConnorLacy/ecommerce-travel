var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Rental = require('../../models/Rental');

router.get('/', function(req,res){
    res.render('index')
});

router.route('/insert').post(function(req,res){
    var rental = new Rental();
    rental.year = req.body.year;
    rental.make = req.body.make;
    rental.model = req.body.model;
    rental.description = req.body.description;
    rental.amount = req.body.amount;
    rental.available = req.body.available;

    rental.save(function(err){
        if(err)
            res.send(err);
        res.send('Rental successfully added');
    })
});

router.route('/update').post(function(req,res){
    const doc = {
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        description: req.body.description,
        amount: req.body.amount,
        available: req.body.available
    };
    console.log(doc);
    Rental.update({_id: req.body._id}, doc, function(err, result){
        if(err)
            res.send(err);
        res.send('Rental successfully udpated!');
    });
});

router.get('/delete', function(req,res){
    var id = req.query.id
    Rental.find({_id: id}).remove().exec(function(err, rental){
        if(err)
            res.send(err)
        res.send('Rental successfully deleted!');
    });
});

router.get('/getAll', function(req,res){
    Rental.find({},
        function(err, rentals){
            if(err)
                res.send(err);
            res.json(rentals);
        });
});

module.exports = router;