import { ApiProperty } from '@nestjs/swagger';

export class CreateCulturaDto {
  @ApiProperty({ example: 'uuid-da-fazenda', description: 'ID da fazenda relacionada' })
  fazendaId: string;

  @ApiProperty({ example: 'Soja', description: 'Nome do rubro cultivado' })
  rubro: string;

  @ApiProperty({ example: 50, description: 'Área utilizada para a cultura (em hectares)' })
  area: number;

  @ApiProperty({ example: 2024, description: 'Ano da safra' })
  safra: number;
}
