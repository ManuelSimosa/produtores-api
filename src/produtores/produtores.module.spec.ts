import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoresModule } from './produtores.module';
import { ProdutoresService } from './produtores.service';
import { ProdutoresController } from './produtores.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Produtor } from './produtores.entity';

describe('ProdutoresModule', () => {
  let module: TestingModule;
  let service: ProdutoresService;
  let controller: ProdutoresController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ProdutoresModule],
    })
      .overrideProvider(getRepositoryToken(Produtor))
      .useValue({})
      .compile();

    service = module.get<ProdutoresService>(ProdutoresService);
    controller = module.get<ProdutoresController>(ProdutoresController);
  });

  it('deve compilar corretamente o módulo', () => {
    expect(module).toBeDefined();
    expect(service).toBeInstanceOf(ProdutoresService);
    expect(controller).toBeInstanceOf(ProdutoresController);
  });
});
