const Joi = require("joi")

const bodyPostSchema = Joi.object({
    descripcion : Joi.string().required().trim().max(20).messages({
        "string.base" : "La descripción debe ser un cadena de texto.",
        "any.required" : "El campo descripción es obligatorio.",
        "string.empty" : "La descripción no puede estar vacía.",
        'string.max': 'La descripción debe tener un máximo de 20 caracteres.'
    }),
    userId : Joi.number().integer().positive().messages({
        "number.base": "El userId debe ser un número",
        "number.integer": "El userId debe ser entero",
        "number.positive": "El userId debe ser positivo"
    })
})

module.exports = bodyPostSchema