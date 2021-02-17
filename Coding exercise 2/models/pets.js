const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema ({
    name: {
        type:String,
        required : [true,"Pet must have name"]
    },
    age: {
        type:Number,
        required : [true,"Pet must have age"]
    },
    colour: {
        type:String,
        required : [true,"Pet must have colour"]
    },
});

module.exports = mongoose.model('Pets', PetSchema);