import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { CulturasService } from './culturas.service';
import { culturaSchema } from './dto/culturas.dto';
import { CreateCulturaDto } from './dto/create-cultura.dto';
import {
  ApiTags,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Culturas')
@Controller('culturas')
export class CulturasController {
  constructor(private readonly service: CulturasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova cultura' })
  @ApiBody({ type: CreateCulturaDto })
  async create(@Body() body: CreateCulturaDto) {
    const { error } = culturaSchema.validate(body);
    if (error) throw new BadRequestException(error.message);
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar culturas' })
  async findAll() {
    return this.service.findAll();
  }

  @Get('/fazenda')
  @ApiOperation({ summary: 'Listar culturas de uma fazenda' })
  @ApiQuery({ name: 'fazendaId', required: true })
  async findByFazenda(@Query('fazendaId') fazendaId: string) {
    if (!fazendaId) {
      throw new BadRequestException('O parâmetro fazendaId é obrigatório.');
    }
    return this.service.findByFazendaId(fazendaId);
  }

  @Get('/count-by-rubro')
  @ApiOperation({
    summary: 'Retorna o mapeamento de culturas plantadas (Gráfico de pizza)',
  })
  async countByRubro() {
    const data = await this.service.countCulturasByRubro();
    return data;
  }

  @Put()
  @ApiOperation({ summary: 'Atualizar uma cultura' })
  @ApiBody({ type: CreateCulturaDto })
  async update(@Body() body: CreateCulturaDto) {
    const { error } = culturaSchema.validate(body);
    if (error) throw new BadRequestException(error.message);
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma cultura' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID da cultura a ser removida',
  })
  async remove(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('O parâmetro id é obrigatório.');
    }
    return this.service.remove(id);
  }
}
