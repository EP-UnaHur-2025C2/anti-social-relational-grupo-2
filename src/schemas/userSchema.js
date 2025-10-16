const Joi = require("joi")

const bodyUserSchema = Joi.object({
    nickName: Joi.string().min(3).trim().required().max(20).messages({
      'string.base': 'El nickName debe ser una cadena de texto.',
      'string.empty': 'El nickName no puede estar vacío.',
      'string.min': 'El nickName debe tener al menos 3 caracteres.',
      'string.max': 'El nickName debe tener un máximo de 20 caracteres.',
      'any.required': 'El campo nickName es obligatorio.'
    })
})

module.exports = bodyUserSchema