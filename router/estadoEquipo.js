const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const EstadoEquipo = require('../models/EstadoEquipo');

const router = Router();


router.post('/', [
    
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo'])

], async function ( req, res ){

    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        let estadoEquipo = new EstadoEquipo();

        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fecha_actualizacion = new Date;
        estadoEquipo.fecha_creacion = new Date;

        estadoEquipo = await estadoEquipo.save();

        res.send(estadoEquipo);


        
    } catch (error) {
        console.log(error);
        res.status(500).send('error ');
    }

})




module.exports = router;