import { produtorSchema } from './produtores.dto';
import { cpf, cnpj } from 'cpf-cnpj-validator';

describe('produtorSchema DTO', () => {
  it('deve validar um CPF válido', () => {
    const validCPF = cpf.generate();

    const result = produtorSchema.validate({
      identidade: validCPF,
      nomeProdutor: 'João da Silva',
    });

    expect(result.error).toBeUndefined();
  });

  it('deve validar um CNPJ válido', () => {
    const validCNPJ = cnpj.generate();

    const result = produtorSchema.validate({
      identidade: validCNPJ,
      nomeProdutor: 'Empresa XYZ Ltda',
    });

    expect(result.error).toBeUndefined();
  });

  it('deve rejeitar CPF inválido', () => {
    const result = produtorSchema.validate({
      identidade: '12345678900',
      nomeProdutor: 'João da Silva',
    });

    expect(result.error).toBeDefined();
    expect(result.error?.details[0].message).toBe('CPF ou CNPJ inválido');
  });

  it('deve rejeitar CNPJ inválido', () => {
    const result = produtorSchema.validate({
      identidade: '12345678000100',
      nomeProdutor: 'Empresa XYZ Ltda',
    });

    expect(result.error).toBeDefined();
    expect(result.error?.details[0].message).toBe('CPF ou CNPJ inválido');
  });

  it('deve rejeitar nomeProdutor vazio', () => {
    const validCPF = cpf.generate();

    const result = produtorSchema.validate({
      identidade: validCPF,
      nomeProdutor: '',
    });

    expect(result.error).toBeDefined();
    expect(result.error?.details[0].message).toBe('O nome do produtor é obrigatório');
  });

  it('deve rejeitar se campos estiverem ausentes', () => {
    const result = produtorSchema.validate({});

    expect(result.error).toBeDefined();
    expect(result.error?.details.length).toBeGreaterThanOrEqual(1);
  });
});
