import { cpf, cnpj } from 'cpf-cnpj-validator';

function generateValidCpf() {
  return cpf.generate(); // genera CPF válido
}

function generateValidCnpj() {
  return cnpj.generate(); // genera CNPJ válido
}

function generateRandomName() {
  const names = [
    'João da Silva',
    'Maria Oliveira',
    'Carlos Souza',
    'Ana Pereira',
  ];
  return names[Math.floor(Math.random() * names.length)];
}

export const exemploCpf = generateValidCpf();
export const exemploCnpj = generateValidCnpj();
export const exemploNome = generateRandomName();
