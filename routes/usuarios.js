const  { Router } = require('express');
const { check } = require('express-validator');


const { validarCampo } = require('../middlewares/validar-campos')
const { esRoleValido, existeEmail } = require('../helpers/db-validators');

const { 

    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch 

} = require('../controllers/usuarios');

const router = Router();

    router.get('/', usuariosGet );

    router.post('/', [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','El password debe ser mas de  6 letras').isLength({min: 6}),
        check('correo','El correo no es valido').isEmail(),
        check('correo').custom( existeEmail ),
        //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom( esRoleValido ), 
        validarCampo
    ],usuariosPost );
    
    router.put('/:id', usuariosPut );

    router.delete('/', usuariosDelete);

    router.patch('/', usuariosPatch );


module.exports = router;