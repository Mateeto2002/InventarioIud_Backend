const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo']
    },
    fecha_actualizacion: {
        type: Date,
        required: true
    },
    fecha_creacion: {
        type: Date,
        required: true
    },
    rol: {
        type: String,
        required: true,
        default: 'user'
    }
});

// Middleware to hash password before saving the user
userSchema.pre('save', async function (next) {
    console.log('Pre-save middleware triggered');
    if (this.isModified('password')) {
        //console.log('Hashing password');
        this.password = await bcrypt.hash(this.password, 10);
        //console.log('Password hashed:', this.password);
    }
    next();
});

// Method to compare entered password with hashed password in database
userSchema.methods.isValidPassword = async function (password) {
    //console.log('Comparing passwords');
    const result = await bcrypt.compare(password, this.password);
    //console.log('Password comparison result:', result);
    return result;
};

const User = mongoose.model('User', userSchema, 'usuarios');

console.log('User model compiled');

module.exports = User;
