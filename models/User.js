const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    username: { type: String,  sparse: true, unique: true },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'], // Limite les valeurs possibles
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('User', userSchema);