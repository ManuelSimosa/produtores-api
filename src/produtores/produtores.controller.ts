import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { ProdutoresService } from './produtores.service';
import { produtorSchema } from './dto/produtores.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProdutorDto } from './dto/create-produtor.dto';

@ApiTags('produtores')
@Controller('produtores')
export class ProdutoresController {
  constructor(private readonly service: ProdutoresService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo produtor' })
  @ApiResponse({ status: 201, description: 'Produtor criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() body: CreateProdutorDto) {
    const { error } = produtorSchema.validate(body);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtores' })
  findAll() {
    return this.service.findAll();
  }

  @Put()
  @ApiOperation({ summary: 'Atualizar um produtor existente' })
  async update(@Body() body: any /* : CreateProdutorDto */) {
    const { error } = produtorSchema.validate(body);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    return this.service.update(body);
  }

  @Delete()
  @ApiOperation({ summary: 'Remover um produtor' })
  async remove(@Body('id') id: string) {
    if (!id) {
      throw new BadRequestException('O campo "id" é obrigatório.');
    }
    return this.service.remove(id);
  }
}
