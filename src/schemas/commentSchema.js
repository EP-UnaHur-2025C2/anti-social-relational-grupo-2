const Joi = require("joi")

const bodyCommentSchema = Joi.object({
    texto: Joi.string().required().trim().max(30).min(3).messages({
            "string.base" : "El texto debe ser un cadena de texto.",
            "any.required" : "El campo descripción es obligatorio.",
            "string.empty" : "El texto no puede estar vacío.",
            "string.max": "El texto debe tener un máximo de 20 caracteres.",
            "string.min": "El texto debe tener al menos 3 caracteres."
        }),
    visible: Joi.boolean().optional().messages({
        "boolean.base": "El campo visible debe ser un valor booleano (true o false)."
    }),
    userId : Joi.number().integer().positive().messages({
        "number.base": "El userId debe ser un número",
        "number.integer": "El userId debe ser entero",
        "number.positive": "El userId debe ser positivo"
    }),
    postId: Joi.number().integer().positive().messages({
            "any.required": "El postId es obligatorio",
            "number.base": "El postId debe ser un número",
            "number.integer": "El postId debe ser entero",
            "number.positive": "El postId debe ser positivo"
    })
})

module.exports = bodyCommentSchema