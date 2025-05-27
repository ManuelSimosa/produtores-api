import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produtor } from './produtores.entity';
import { ProdutoresService } from './produtores.service';
import { ProdutoresController } from './produtores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Produtor])],
  providers: [ProdutoresService],
  controllers: [ProdutoresController],
  exports: [ProdutoresService, TypeOrmModule],
})
export class ProdutoresModule {}
