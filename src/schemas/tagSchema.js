const Joi = require("joi")

const bodyTagSchema = Joi.object({
    nombre: Joi.string().required().trim().max(20).messages({
            "string.base" : "La etiqueta debe ser un cadena de texto.",
            "any.required" : "La etiqueta es obligatoria.",
            "string.empty" : "La etiqueta no puede estar vacía.",
            'string.max': 'La etiqueta debe tener un máximo de 15 caracteres.'
        })
})

const idBodyTagSchema = Joi.object({
    tagId: Joi.number().integer().positive().messages({
            "any.required": "El tagId es obligatorio",
            "number.base": "El tagId debe ser un número",
            "number.integer": "El tagId debe ser entero",
            "number.positive": "El tagId debe ser positivo"
        })
})

module.exports = {bodyTagSchema, idBodyTagSchema}