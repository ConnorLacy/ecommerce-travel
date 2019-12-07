var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var rentalSchema = new Schema({
    year: String,
    make: String,
    model: String,
    description: String,
    amount: String,
    available: String,  
});

module.exports = mongoose.model('Rental', rentalSchema);