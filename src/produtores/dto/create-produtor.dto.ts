import { ApiProperty } from '@nestjs/swagger';
import { exemploCpf, exemploNome } from './data-generator';

export class CreateProdutorDto {
  @ApiProperty({
    example: exemploCpf,
    description: 'CPF ou CNPJ válido do produtor',
  })
  identidade: string;

  @ApiProperty({
    example: exemploNome,
    description: 'Nome completo do produtor',
  })
  nomeProdutor: string;
}
