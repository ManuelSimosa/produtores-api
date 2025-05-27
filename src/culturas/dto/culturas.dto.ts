import * as Joi from '@hapi/joi';

export const culturaSchema = Joi.object({
  fazendaId: Joi.string().uuid({ version: 'uuidv4' }).required().messages({
    'string.empty': 'O campo fazendaId é obrigatório.',
    'string.uuid': 'O fazendaId deve ser um UUID válido.',
  }),

  rubro: Joi.string().trim().min(2).required().messages({
    'string.empty': 'O campo rubro é obrigatório.',
    'string.min': 'O rubro deve ter no mínimo 2 caracteres.',
  }),

  area: Joi.number().positive().required().messages({
    'number.base': 'A área deve ser um número.',
    'number.positive': 'A área deve ser um número positivo.',
    'any.required': 'O campo área é obrigatório.',
  }),

  safra: Joi.number().integer().min(1900).max(2100).required().messages({
    'number.base': 'A safra deve ser um número.',
    'number.integer': 'A safra deve ser um número inteiro.',
    'number.min': 'A safra deve ser maior ou igual a 1900.',
    'number.max': 'A safra deve ser menor ou igual a 2100.',
    'any.required': 'O campo safra é obrigatório.',
  }),
});
