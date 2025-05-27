import { Test, TestingModule } from '@nestjs/testing';
import { FazendasModule } from './fazendas.module';
import { FazendasService } from './fazendas.service';
import { FazendasController } from './fazendas.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Fazenda } from './fazendas.entity';
import { Produtor } from '../produtores/produtores.entity';

describe('FazendasModule', () => {
  let module: TestingModule;
  let service: FazendasService;
  let controller: FazendasController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [FazendasModule],
    })
      .overrideProvider(getRepositoryToken(Fazenda))
      .useValue({})
      .overrideProvider(getRepositoryToken(Produtor))
      .useValue({})
      .compile();

    service = module.get<FazendasService>(FazendasService);
    controller = module.get<FazendasController>(FazendasController);
  });

  it('deve compilar corretamente o módulo', () => {
    expect(module).toBeDefined();
    expect(service).toBeInstanceOf(FazendasService);
    expect(controller).toBeInstanceOf(FazendasController);
  });
});
