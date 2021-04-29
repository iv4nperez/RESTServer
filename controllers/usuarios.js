const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const Usuario = require('../models/usuario');

const usuariosGet = (req = request , res = response) => {
    const { q, nombre, apiKey, page, limit } = req.query;
    res.json({
        msg:'get API - controlador',
        q,
        nombre,
        apiKey,
        page,
        limit
    });
}

const usuariosPost = async (req , res = response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    
    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });

    //verificar si el correo existe


    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //Guardar en base de datos
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = (req , res = response) => {
    const { id } = req.params;
    res.json({
        msg:'put API - controlador',
        id
    });
}

const usuariosDelete = (req , res = response) => {
    res.json({
        msg:'delete API - controlador'
    });
}

const usuariosPatch = (req , res = response) => {
    res.json({
        msg:'patch API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}