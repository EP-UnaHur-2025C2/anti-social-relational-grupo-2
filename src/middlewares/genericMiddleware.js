const Joi = require("joi")
const {genericSchemaValidator, idParamsSchema} = require("../schemas/genericSchema")

const errorMapper = (error) =>
  error.details.map((e) => ({
    atributo: e.path.join("."),
    detalle: e.message,
  }));

const validarIdParams = (paramName) => (req,res,next) => {
    const {error, value } = genericSchemaValidator(idParamsSchema(paramName), req.params)
    if (error) {
        return res.status(400).json({
          errores: errorMapper(error),
        });
    }
    next()
}

module.exports = {
    validarIdParams
}