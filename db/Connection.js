// db/Connection.js
const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        // const url = process.env.MONGO_URI;
        const url = "mongodb+srv://mateoperez:Mateito2002@asesoria-db.aha2fnz.mongodb.net/asesoria-db?retryWrites=true&w=majority"
        console.log('Connecting to MongoDB:', url); // Debug log
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conexion exitosa');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};

module.exports = { getConnection };
