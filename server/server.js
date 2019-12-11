var creds = require('../models/creds')
var express = require('express');
var router = require('./routes/routes')
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

console.log(`User: ${creds.dbu}\nPass: ${creds.dbp}\n`)

mongoose.connect(`mongodb+srv://${creds.dbu}:${creds.dbp}@main-o5std.gcp.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}, )

app.use('/', router);
module.exports=app;    