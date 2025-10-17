const Joi = require("joi")

bodyImageSchema = Joi.object({
    url: Joi.string().uri().required().messages({
        "string.uri": "La url debe ser válida.",
        "any.required" : "La url es obligatorio.",
        "string.empty" : "La url no puede estar vacía."
    }),
    postId: Joi.number().integer().positive().messages({
            "any.required": "El postId es obligatorio",
            "number.base": "El postId debe ser un número",
            "number.integer": "El postId debe ser entero",
            "number.positive": "El postId debe ser positivo"
    })
})

module.exports = bodyImageSchema