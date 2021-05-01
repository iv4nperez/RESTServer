const { validationResult } = require('express-validator');

const validarCampo = ( req, res, next ) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    
    next();
}



module.exports = {
    validarCampo
}