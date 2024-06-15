const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const TipoEquipo = require('../models/TipoEquipo')


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

        let tipoEquipo = new TipoEquipo();

        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fecha_actualizacion = new Date;
        tipoEquipo.fecha_creacion = new Date;

        tipoEquipo = await tipoEquipo.save();

        res.send(tipoEquipo);


        
    } catch (error) {
        console.log(error);
        res.status(500).send('error ');
    }

})

module.exports = router;