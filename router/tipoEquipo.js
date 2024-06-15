const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const TipoEquipo = require('../models/TipoEquipo');
const auth = require('../utilities/authMiddleware');


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

//Listar Tipos de Equipos
router.get('/', auth, async function (req, res) {
    try {
        const tipoEquipo = await TipoEquipo.find();
        res.send(tipoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener los tipoEquipos');
    }
});



//Editar tipos de equipos
router.put('/:id', [
    auth, // Use authentication middleware
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
   
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msj: errors.array() });
        }

        const { id } = req.params;
        const { nombre, estado } = req.body;
        let tipoEquipo = await TipoEquipo.findById(id);
        if (!tipoEquipo) {
            return res.status(404).json({ msj: 'Tipo de Equipo no encontrado' });
        }

        tipoEquipo.nombre = nombre;
        tipoEquipo.estado = estado;
        tipoEquipo.fecha_creacion = tipoEquipo.fecha_creacion; // preserve original creation date
        tipoEquipo.fecha_actualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el tipoEquipo');
    }
});

module.exports = router;