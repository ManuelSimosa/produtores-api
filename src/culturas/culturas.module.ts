import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cultura } from './culturas.entity';
import { CulturasService } from './culturas.service';
import { CulturasController } from './culturas.controller';
import { Fazenda } from '../fazendas/fazendas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cultura, Fazenda])],
  providers: [CulturasService],
  controllers: [CulturasController],
  exports: [CulturasService],
})
export class CulturasModule { }
