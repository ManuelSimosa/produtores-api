import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  BadRequestException,
  Param
} from '@nestjs/common';
import { FazendasService } from './fazendas.service';
import { fazendaSchema } from './dto/fazendas.dto';
import { CreateFazendaDto } from './dto/create-fazenda.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Fazendas')
@Controller('fazendas')
export class FazendasController {
  constructor(private readonly service: FazendasService) { }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova fazenda' })
  @ApiBody({ type: CreateFazendaDto })
  @ApiResponse({ status: 201, description: 'Fazenda criada com sucesso' })
  async create(@Body() body: CreateFazendaDto) {
    const { error } = fazendaSchema.validate(body);
    if (error) throw new BadRequestException(error.message);
    if (body.areaAgricultavel + body.areaVegetacao !== body.areaTotal) {
      throw new BadRequestException('La suma de área agricultable y vegetación debe ser igual al área total');
    }

    return this.service.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as fazendas' })
  findAll() {
    return this.service.findAll();
  }

  @Get('count')
  @ApiOperation({ summary: 'Retorna a quantidade de fazendas' })
  async count() {
    return this.service.count();
  }

  @Get('/total-area')
  @ApiOperation({ summary: 'Retorna a área total registrada' })
  async getTotalArea() {
    return { totalArea: await this.service.getTotalArea() };
  }

  @Get('/count-by-estado')
  @ApiOperation({ summary: 'Retorna o mapeamento de fazenda por estados (Gráfico de pizza)' })
  async countByEstado() {
    const data = await this.service.countFazendasByEstado();
    return data;
  }

  @Get(':id/uso-do-solo')
    @ApiOperation({ summary: 'Retorna a quantidade de area de tipo de solo por fazenda (Gráfico de pizza)' })
  async usoDoSolo(@Param('id') id: string) {
    return this.service.getUsoDoSoloDistribuicao(id);
  }

  @Put()
  @ApiOperation({ summary: 'Atualizar uma fazenda' })
  @ApiBody({ type: CreateFazendaDto })
  async update(@Body() body: CreateFazendaDto) {
    const { error } = fazendaSchema.validate(body);
    if (error) throw new BadRequestException(error.message);
    return this.service.update(body);
  }

  @Delete()
  @ApiOperation({ summary: 'Remover uma fazenda' })
  async remove(@Body('id') id: string) {
    if (!id) throw new BadRequestException('O campo id é obrigatório');
    return this.service.remove(id);
  }
}
