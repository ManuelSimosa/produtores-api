import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fazenda } from './fazendas.entity';
import { FazendasService } from './fazendas.service';
import { FazendasController } from './fazendas.controller';
import { Produtor } from '../produtores/produtores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fazenda, Produtor])],
  providers: [FazendasService],
  controllers: [FazendasController],
  exports: [FazendasService, TypeOrmModule],
})
export class FazendasModule {}
