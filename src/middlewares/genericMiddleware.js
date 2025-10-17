//const Joi = require("joi")
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

const validarBodyGenerico = (schema) => (req,res,next) => {
    const { error , value } = genericSchemaValidator(schema, req.body)
    if (error){
        return res.status(400).json({
            errores : errorMapper(error)
        })
    }
    req.body = value
    next()
}

const validarId = (modelo, data) => {
  return async (req,res,next) => { 
    const respuesta = await modelo.findByPk(req.params[data])
    if (!respuesta){
      return res.status(404).json(`El ${modelo.name} ${req.params[data]} no existe`)
    }
    next()
  }
}

const validarCampoUnico = (modelo, data) => {
  return async (req,res,next) => {
    const user = await modelo.findOne({
        where:{
            [data]: req.body[data]
        }
    })
    if(user){
        return res.status(404).json(`El ${modelo.name} ${req.body[data]} ya existe`)
    }
    next()
  }
}

module.exports = {
    validarIdParams,
    validarId,
    errorMapper,
    validarCampoUnico,
    validarBodyGenerico
}