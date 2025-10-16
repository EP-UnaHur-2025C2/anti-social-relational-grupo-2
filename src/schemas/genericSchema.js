const Joi = require("joi")

const genericSchemaValidator = (schema, data) => {
  const { error, value } = schema.validate(data, { abortEarly: false, allowUnknown: true }); // permite que haya otras propiedades además de la que estás validando
  return { error, value };
};

const idParamsSchema = (nombreParam) => Joi.object({
  [nombreParam]: Joi.number().integer().positive().required()
}).messages({
    "any.required": `El parametro ${nombreParam} es obligatorio`,
    "number.base": `El parametro ${nombreParam} debe ser un número`,
    "number.integer": `El parametro ${nombreParam} debe ser entero`,
    "number.positive": `El parametro ${nombreParam} debe ser positivo`
});


module.exports = {
    idParamsSchema,
    genericSchemaValidator
}