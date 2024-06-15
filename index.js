const express = require('express');
const cors = require('cors');
const { getConnection } = require('./db/Connection');
require('dotenv').config();

const authRoutes = require('./utilities/auth'); // Ensure this points to the correct path
const authenticate = require('./utilities/authMiddleware'); // Ensure this points to the correct path

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// Establish MongoDB connection
getConnection();

// Authentication routes
app.use('/auth', authRoutes);

// Protected routes
app.use('/estadoEquipo', authenticate, require('./router/estadoEquipo'));
app.use('/inventario', authenticate, require('./router/inventario'));
app.use('/marca', authenticate, require('./router/marca'));
app.use('/tipoEquipo', authenticate, require('./router/tipoEquipo'));
app.use('/usuario', authenticate, require('./router/usuario'));

// Start the server with verbose logging
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    // console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    // console.log(`MongoDB URI: ${process.env.MONGO_URI}`);
    // console.log(`JWT Secret: ${process.env.JWT_SECRET ? 'Configured' : 'Not Configured'}`);
    // console.log(`CORS Enabled: ${app.get('trust proxy')}`);
});
