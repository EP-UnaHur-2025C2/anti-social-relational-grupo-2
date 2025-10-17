const Joi = require("joi")

const bodyTagSchema = Joi.object({
    nombre: Joi.string().required().trim().max(15).messages({
            "string.base" : "La etiqueta debe ser un cadena de texto.",
            "any.required" : "La etiqueta es obligatoria.",
            "string.empty" : "La etiqueta no puede estar vacía.",
            'string.max': 'La etiqueta debe tener un máximo de 15 caracteres.'
        })
})

module.exports = {bodyTagSchema}