const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');

exports.findByEmail = (email) => User.findOne({email});

const SECRET = 'someveryveryverysomescret'

exports.login = async (email, password) => {
    const user = await this.findByEmail(email);

    if(!user) {
        throw new Error('Invalid username or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid username or password!');
    };

    if(email.length < 10) {
        throw new Error('Email is too short!');
    }

    if(password.length < 4 ) {
        throw new Error('Password is too short!');
    }
    //generate token

    const payload = {
        _id: user._id,
        email: user.email,
        
    };

    const token = await jwt.sign(payload, SECRET);

    return token;
    
};

exports.register = async (email, password, repeatPassword) => {
    
    //check if password is valid
    if(password !== repeatPassword) {
        throw new Error('Password missmatch!');
    }

    //check if user exist
    const existingUser = await User.findOne({email});
    
    if(existingUser) {
        throw new Error('Username already exists!');
    }

    if(email.length < 10) {
        throw new Error('Email is too short!');
    }

    if(password.length < 4 ) {
        throw new Error('Password is too short!');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    await User.create({email, password: hashedPassword});

    return this.login(email, password);
};