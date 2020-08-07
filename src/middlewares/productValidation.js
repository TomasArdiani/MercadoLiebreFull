const {check} = require("express-validator");

const productValidation = [
    check("name")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("Debe ingresar el nombre del producto")
        .isLength({min: 10, max: 100}).withMessage("El nombre del producto debe tener al menos 10 caracteres y 100 como máximo"),
    check("price")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("Debe ingresar el precio")
        .isFloat({no_symbols: true}).withMessage("El precio solo puede ser numérico, no puede contener otros caracteres")
        .isFloat({min: 1}).withMessage("El precio no puede ser 0"),
    check("discount")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("Debe ingresar el descuento")
        .isInt({no_symbols: true}).withMessage("El descuento solo puede ser numérico, no puede contener otros caracteres")
        .isInt({min: 0, max: 99}).withMessage("El descuento no puede ser menor a 0 ni mayor a 99"),
    check("category")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("Debe seleccionar la categoría"),
    check("description")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("Debe ingresar la descripción")
        .isLength({min: 10}).withMessage("La descripción debe tener al menos 10 caracteres")
        .isLength({max: 500}).withMessage("La descripción no puede tener más de 500 caracteres")
];

module.exports = productValidation;