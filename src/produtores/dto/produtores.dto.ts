import * as Joi from '@hapi/joi';
import { cpf, cnpj } from 'cpf-cnpj-validator';


export const produtorSchema = Joi.object({
  identidade: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (value.length <= 11) {
        if (!cpf.isValid(value)) {
          return helpers.error('any.invalid');
        }
      } else {
        if (!cnpj.isValid(value)) {
          return helpers.error('any.invalid');
        }
      }
      return value;
    })
    .message({ 'any.invalid': 'CPF ou CNPJ inválido' }),

  nomeProdutor: Joi.string().required().messages({
    'string.empty': 'O nome do produtor é obrigatório',
  }),
});
