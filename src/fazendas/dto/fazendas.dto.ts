// fazendas.dto.ts
import * as Joi from '@hapi/joi';

export const fazendaSchema = Joi.object({
  produtorId: Joi.string().uuid().required().messages({
    'string.base': 'O campo produtorId deve ser uma string',
    'string.empty': 'O campo produtorId é obrigatório',
    'string.uuid': 'O campo produtorId deve ser um UUID válido',
    'any.required': 'O campo produtorId é obrigatório',
  }),
  nome: Joi.string().min(3).required().messages({
    'string.empty': 'O campo nome é obrigatório',
    'string.min': 'O campo nome deve ter pelo menos {#limit} caracteres',
  }),
  cidade: Joi.string().required().messages({
    'string.empty': 'O campo cidade é obrigatório',
  }),
  estado: Joi.string().length(2).uppercase().required().messages({
    'string.empty': 'O campo estado é obrigatório',
    'string.length': 'O campo estado deve conter exatamente 2 letras',
    'string.uppercase': 'O campo estado deve estar em letras maiúsculas',
  }),
  areaTotal: Joi.number().integer().positive().required().messages({
    'number.base': 'O campo areaTotal deve ser um número',
    'number.integer': 'O campo areaTotal deve ser um número inteiro',
    'number.positive': 'O campo areaTotal deve ser maior que 0',
    'any.required': 'O campo areaTotal é obrigatório',
  }),

  areaAgricultavel: Joi.number().integer().positive().required().messages({
    'number.base': 'O campo areaAgricultavel deve ser um número',
    'number.integer': 'O campo areaAgricultavel deve ser um número inteiro',
    'number.positive': 'O campo areaAgricultavel deve ser maior que 0',
    'any.required': 'O campo areaAgricultavel é obrigatório',
  }),
  areaVegetacao: Joi.number().integer().positive().required().messages({
    'number.base': 'O campo areaVegetacao deve ser um número',
    'number.integer': 'O campo areaVegetacao deve ser um número inteiro',
    'number.positive': 'O campo areaVegetacao deve ser maior que 0',
    'any.required': 'O campo areaVegetacao é obrigatório',
  }),
});
