import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoresModule } from './produtores/produtores.module';
import { FazendasModule } from './fazendas/fazendas.module';
import { CulturasModule } from './culturas/culturas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProdutoresModule,
    FazendasModule,
    CulturasModule,
  ]
})
export class AppModule {}
