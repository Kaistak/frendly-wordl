const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        required: [true, 'Name shout be longer than 2 characters!'],
    },
    years: {
        type: Number,
        min:1,
        max: 100,
        required: [true, 'Enter valid data!'],
    },
    kind: {
        type: String,
        minLength: 3,
        required: [true, 'Enter valid data!'],
    },
    image: {
        type: String,
        
        required: [true, 'Enter valid data!'],
    },
    need: {
        type: String,
        minLength:3,
        maxLength: 20,
        required: [true, 'Enter valid data!'],
    },
    location: {
        type: String,
        minLength:5,
        maxLength: 15,
        required: [true, 'Enter valid data!'],
    },
    description: {
        type: String,
        minLength:5,
        maxLength: 50,
        required: [true, 'Enter valid data!'],
    },
    donation: [{
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
        }
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;