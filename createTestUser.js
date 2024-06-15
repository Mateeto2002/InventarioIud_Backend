require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/Usuario'); // Adjust the path to your User model

async function createUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Create a new user
        const user = new User({
            nombre: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123', // Ensure your model hashes the password before saving
            estado: 'Activo',
            fecha_actualizacion: new Date(),
            fecha_creacion: new Date()
        });

        // Save the user to the database
        await user.save();
        console.log('User created successfully');
    } catch (err) {
        console.error('Error creating user:', err);
    } finally {
        // Close the MongoDB connection
        mongoose.connection.close();
    }
}

// Call the createUser function to create a test user
createUser();
