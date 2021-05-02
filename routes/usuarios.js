const  { Router } = require('express');
const { check } = require('express-validator');


const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

// const { validarCampo } = require('../middlewares/validar-campos')
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole,tieneRole } = require('../middlewares/validar-roles');
const { 

    validarCampo,
    validarJWT,
    esAdminRole,
    tieneRole 

} = require('../middlewares')
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
    
    router.put('/:id', [
        check('id','No es un ID valido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampo
    ] ,usuariosPut );

    router.delete('/:id',[
        validarJWT,
        //esAdminRole,
        tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
        check('id','No es un ID valido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampo
    ], usuariosDelete);

    router.patch('/', usuariosPatch );


module.exports = router;