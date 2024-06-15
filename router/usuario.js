const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('password', 'invalid.password').not().isEmpty(),
    check('email', 'invalid.email').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo'])

], async function ( req, res ){

    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        let usuario = new Usuario();

        usuario.nombre = req.body.nombre;
        usuario.estado = req.body.estado;
        usuario.email = req.body.email;
        usuario.password = req.body.password;
        usuario.fecha_actualizacion = new Date;
        usuario.fecha_creacion = new Date;

        usuario = await usuario.save();

        res.send(usuario);


        
    } catch (error) {
        console.log(error);
        res.status(500).send('error ');
    }

})

module.exports = router;