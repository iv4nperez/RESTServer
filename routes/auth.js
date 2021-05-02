const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampo } = require('../middlewares/validar-campos')

const { login } = require('../controllers/auth');


const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es oblitatoria').not().isEmpty(),
    validarCampo
],  login);


module.exports = router;