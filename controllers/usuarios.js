const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

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
   
    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //Guardar en base de datos
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req , res = response) => {
    const { id } = req.params;
    const { password, google,correo, ...resto } = req.body;

    //TODO validar contra db
    if ( password ) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        msg:'put API - controlador',
        usuario
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