var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var rentalSchema = new Schema({
    year_make_model: String,
    description: String,
    amount: Number,
    available: Boolean,  
});

module.exports = mongoose.model('Rental', rentalSchema);