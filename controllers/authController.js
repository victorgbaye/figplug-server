const User  = require('../models/User')
const { StatusCodes } = require('http-status-codes');
const customError = require('../errors')
const jwt = require('jsonwebtoken')
const { attachCookiesToResponse, createTokenUser } = require('../utils');

// register
const register = async(req, res) => {
    const {firstname, lastname, email, password} = req.body

    const emailAlreadyExists = await User.findOne({email})
    if(emailAlreadyExists){
        throw new customError.BadRequestError('Email already exists')
    }

        // first registered user is an admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';


    const user = await User.create({firstname, lastname, email, password, role  });
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.CREATED).json({user:tokenUser})
}


// login
const login = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        throw new customError.BadRequestError('please provide email and password')
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new customError.UnauthenticatedError('Invalid Credentials');
      }
      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
        throw new customError.UnauthenticatedError('Invalid Credentials');
      }
      const tokenUser = createTokenUser(user);
      attachCookiesToResponse({ res, user: tokenUser });
    
      res.status(StatusCodes.OK).json({ user: tokenUser });
}

// logout
const logout = async (req, res) => {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
  };


module.exports ={register, login, logout}