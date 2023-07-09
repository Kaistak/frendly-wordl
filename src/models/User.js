const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
    }
}, {
    virtuals: {
        repeatPassword: {
            set(value){
                if(this.password !== value) {
                    throw new mongoose.Error('Password missmatch!');
                }
            }
        }
    }
} );

const User = mongoose.model('User', userSchema);

module.exports = User;