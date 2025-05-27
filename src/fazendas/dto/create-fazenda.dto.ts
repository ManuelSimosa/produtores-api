import { ApiProperty } from '@nestjs/swagger';

export class CreateFazendaDto {
  @ApiProperty({ example: 'uuid-do-produtor', description: 'ID do produtor' })
  produtorId: string;

  @ApiProperty({
    example: 'Fazenda Boa Esperança',
    description: 'Nome da fazenda',
  })
  nome: string;

  @ApiProperty({ example: 'Chapecó', description: 'Cidade da fazenda' })
  cidade: string;

  @ApiProperty({ example: 'SC', description: 'Estado (UF)' })
  estado: string;

  @ApiProperty({
    example: 100,
    description: 'Área total da fazenda em hectares',
  })
  areaTotal: number;

  @ApiProperty({ example: 50, description: 'Área que pode ser semeada' })
  areaAgricultavel: number;

  @ApiProperty({ example: 50, description: 'Área que não pode ser semeada' })
  areaVegetacao: number;
}
