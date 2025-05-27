import { Test, TestingModule } from '@nestjs/testing';
import { CulturasService } from './culturas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cultura } from './culturas.entity';
import { Fazenda } from '../fazendas/fazendas.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

import { ObjectLiteral } from 'typeorm';

type MockRepo<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('CulturasService', () => {
  let service: CulturasService;
  let culturaRepo: MockRepo<Cultura>;
  let fazendaRepo: MockRepo<Fazenda>;

  beforeEach(async () => {
    culturaRepo = {
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      createQueryBuilder: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([{ rubro: 'Soja', count: 2 }]),
      }),
    };

    fazendaRepo = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CulturasService,
        { provide: getRepositoryToken(Cultura), useValue: culturaRepo },
        { provide: getRepositoryToken(Fazenda), useValue: fazendaRepo },
      ],
    }).compile();

    service = module.get<CulturasService>(CulturasService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create()', () => {
    it('deve lançar exceção se a fazenda não existir', async () => {
      fazendaRepo.findOne!.mockResolvedValue(null);

      await expect(service.create({
        fazendaId: '1',
        area: 10,
        safra: 2024,
      })).rejects.toThrow(BadRequestException);
    });

    it('deve lançar exceção se a área não for informada', async () => {
      fazendaRepo.findOne!.mockResolvedValue({ id: '1', areaTotal: 100, culturas: [] });
      culturaRepo.find?.mockResolvedValue([]);

      await expect(service.create({
        fazendaId: '1',
        safra: 2025,
        // area não informado
      })).rejects.toThrow('Área da cultura deve ser informada');
    });

    it('deve lançar exceção se área da cultura exceder o total disponível na safra', async () => {
      fazendaRepo.findOne!.mockResolvedValue({ id: '1', areaTotal: 100, culturas: [] });

      culturaRepo.find?.mockResolvedValue([
        { area: 60, safra: 2025, fazendaId: '1' },
        { area: 30, safra: 2025, fazendaId: '1' },
      ]);

      await expect(service.create({
        fazendaId: '1',
        safra: 2025,
        area: 20,
      })).rejects.toThrow('Área total da fazenda (100) excedida');
    });

    it('deve criar cultura com sucesso', async () => {
      const fazenda = { id: '1', areaTotal: 100, culturas: [] };

      fazendaRepo.findOne!.mockResolvedValue(fazenda);
      culturaRepo.find?.mockResolvedValue([
        { area: 40, safra: 2025, fazendaId: '1' },
      ]);

      const data = {
        fazendaId: '1',
        safra: 2025,
        area: 50,
        rubro: 'Soja',
      };

      const culturaCriada = { ...data, id: 'c1' };
      culturaRepo.create!.mockReturnValue(culturaCriada);
      culturaRepo.save?.mockResolvedValue(culturaCriada);

      const result = await service.create(data);

      expect(fazendaRepo.findOne).toHaveBeenCalled();
      expect(culturaRepo.find).toHaveBeenCalled();
      expect(culturaRepo.create).toHaveBeenCalledWith({ ...data, fazenda });
      expect(result).toEqual(culturaCriada);
    });
  });

  it('findAll() deve retornar todas as culturas', async () => {
    const mock = [{ id: 'c1' }];
    culturaRepo.find?.mockResolvedValue(mock);

    const result = await service.findAll();
    expect(result).toEqual(mock);
  });

  it('findByFazendaId() deve retornar culturas por fazenda', async () => {
    const mock = [{ id: 'c1', fazenda: { id: 'f1' } }];
    culturaRepo.find?.mockResolvedValue(mock);

    const result = await service.findByFazendaId('f1');
    expect(culturaRepo.find).toHaveBeenCalledWith({ where: { fazenda: { id: 'f1' } } });
    expect(result).toEqual(mock);
  });

  it('update() deve salvar cultura', async () => {
    const mock = { id: 'c1' };
    culturaRepo.save?.mockResolvedValue(mock);

    const result = await service.update(mock);
    expect(culturaRepo.save).toHaveBeenCalledWith(mock);
    expect(result).toEqual(mock);
  });

  it('remove() deve deletar cultura', async () => {
    culturaRepo.delete?.mockResolvedValue(undefined);

    const result = await service.remove('c1');
    expect(culturaRepo.delete).toHaveBeenCalledWith({ id: 'c1' });
    expect(result).toEqual({ deleted: true });
  });

  it('countCulturasByRubro() deve retornar contagem por rubro', async () => {
    const result = await service.countCulturasByRubro();
    expect(result).toEqual([{ rubro: 'Soja', count: 2 }]);
  });
});
