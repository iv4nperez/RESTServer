const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req, res = response  ) => {
    const { correo, password} = req.body;

    try {
        
        //verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if ( !usuario ){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            })
        }
        //verificar si el usuario esta activo
        if ( !usuario.estado ){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado:false'
            })
        }
        //verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            })
        }
        //generar JWT
        const token = await generarJWT( usuario.id );
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador'
        });
    }
}


const googleSignin = async ( req, res = response ) => {
    const { id_token } = req.body;

    
    try {
        
        const { correo, img, nombre } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ){
            //crear usuario
            const data = {
                nombre,
                correo,
                img,
                password:':p',
                google:true,
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        if ( !usuario.estado ){
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            })
        }

        //generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log( error )
        res.status(400).json({
            msg:'Token de google no es válido'
        })
    }


    

}



module.exports = {
    login,
    googleSignin
}