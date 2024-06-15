const { Router } = require('express');
const Inventario = require('../models/Inventario');
const { validationResult, check } = require('express-validator');

const router = Router();


router.post('/', [

  
    check('modelo', 'invalid.modelo').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
    check('foto', 'invalid.foto').not().isEmpty(),
    check('color', 'invalid.color').not().isEmpty(),
    check('fecha_compra', 'invalid.fecha_compra').not().isEmpty(),
    check('precio', 'invalid.precio').not().isEmpty(),
    check('usuario', 'invalid.usuario').not().isEmpty(),
    check('marca', 'invalid.marca').not().isEmpty(),
    check('tipo_equipo', 'invalid.tipo_equipo').not().isEmpty(),
    check('estado_equipo', 'invalid.estado_equipo').not().isEmpty()

    

], async function ( req, res ){
    
    try {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).json({ mensaje: errors.array() });
        }

        const existeSerial = await Inventario.findOne({ serial: req.body.serial });
        if (existeSerial) {
            return res.status(400).send('Serial ya existente');
        }

        let inventario = new Inventario();

        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.fecha_compra = req.body.fecha_compra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario;
        inventario.marca= req.body.marca;
        inventario.estado_equipo = req.body.estado_equipo;
        inventario.tipo_equipo = req.body.tipo_equipo;

        inventario = await inventario.save();
        res.status(500).send(inventario);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error");
    }


})

module.exports = router;