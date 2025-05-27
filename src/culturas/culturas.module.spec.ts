import { Test, TestingModule } from '@nestjs/testing';
import { CulturasModule } from './culturas.module';
import { CulturasService } from './culturas.service';
import { CulturasController } from './culturas.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cultura } from './culturas.entity';
import { Fazenda } from '../fazendas/fazendas.entity';
import { Repository } from 'typeorm';

describe('CulturasModule', () => {
  let module: TestingModule;
  let service: CulturasService;
  let controller: CulturasController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CulturasModule],
    })
      .overrideProvider(getRepositoryToken(Cultura))
      .useValue({}) // Puedes simular métodos como find, save, etc. si lo deseas
      .overrideProvider(getRepositoryToken(Fazenda))
      .useValue({})
      .compile();

    service = module.get<CulturasService>(CulturasService);
    controller = module.get<CulturasController>(CulturasController);
  });

  it('deve compilar corretamente o módulo', () => {
    expect(module).toBeDefined();
    expect(service).toBeInstanceOf(CulturasService);
    expect(controller).toBeInstanceOf(CulturasController);
  });
});
