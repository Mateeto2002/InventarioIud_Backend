const { Router } = require('express');
const Usuario = require('../models/Usuario.js');
const { validationResult, check } = require('express-validator');
const auth = require('../utilities/authMiddleware'); // Correct import

const router = Router();

// Create a new user (protected route)
router.post('/', [
    auth, // Use authentication middleware
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('password', 'invalid.password').not().isEmpty(),
    check('email', 'invalid.email').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo'])
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let usuario = new Usuario();

        usuario.nombre = req.body.nombre;
        usuario.estado = req.body.estado;
        usuario.email = req.body.email;
        usuario.password = req.body.password;
        usuario.fecha_actualizacion = new Date();
        usuario.fecha_creacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al crear el usuario');
    }
});

// Update an existing user (protected route)
router.put('/:id', [
    auth, // Use authentication middleware
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('email', 'invalid.email').not().isEmpty(),
    check('rol', 'invalid.rol').not().isEmpty(),
    check('password', 'invalid.password').not().isEmpty()
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msj: errors.array() });
        }

        const { id } = req.params;
        const { nombre, estado, email, rol, password } = req.body;
        let usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ msj: 'Usuario no encontrado' });
        }

        usuario.nombre = nombre;
        usuario.estado = estado;
        usuario.email = email;
        usuario.rol = rol;
        usuario.password = password;
        usuario.fecha_creacion = usuario.fecha_creacion; // preserve original creation date
        usuario.fecha_actualizacion = new Date();

        usuario = await usuario.save();
        res.send(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el usuario');
    }
});

// Get all users (protected route)
router.get('/', auth, async function (req, res) {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener los usuarios');
    }
});

module.exports = router;
