const express = require('express')
const jwt = require('jsonwebtoken')

const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
})