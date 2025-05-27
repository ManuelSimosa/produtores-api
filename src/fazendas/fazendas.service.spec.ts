import { Test, TestingModule } from '@nestjs/testing';
import { FazendasService } from './fazendas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Fazenda } from './fazendas.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('FazendasService', () => {
  let service: FazendasService;
  let repo: Repository<Fazenda>;

  const mockFazendaRepo = {
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
    findOneBy: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      // select: jest.fn().mockReturnThis(),
      // addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn(),
      // getRawOne: jest.fn(),
    })),
  };

  const getRawOneMock = jest.fn().mockResolvedValue({ totalArea: 100 });
  const getRawManyMock = jest.fn();
  const addSelectMock = jest.fn().mockReturnThis();
  const selectMock = jest.fn().mockReturnThis();
  const groupByMock = jest.fn().mockReturnThis();

  const mockQueryBuilder = {
    select: selectMock,
    addSelect: addSelectMock,
    groupBy: groupByMock,
    getRawMany: getRawManyMock,
    getRawOne: getRawOneMock,
  };

  mockFazendaRepo.createQueryBuilder.mockReturnValue(mockQueryBuilder);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FazendasService,
        {
          provide: getRepositoryToken(Fazenda),
          useValue: mockFazendaRepo,
        },
      ],
    }).compile();

    service = module.get<FazendasService>(FazendasService);
    repo = module.get<Repository<Fazenda>>(getRepositoryToken(Fazenda));
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create() should save a fazenda', async () => {
    const data = { nome: 'Fazenda 1' };
    mockFazendaRepo.save.mockResolvedValue(data);

    const result = await service.create(data);
    expect(result).toEqual(data);
    expect(repo.save).toHaveBeenCalledWith(data);
  });

  it('findAll() should return all fazendas', async () => {
    const fazendas = [{ nome: 'Fazenda A' }];
    mockFazendaRepo.find.mockResolvedValue(fazendas);

    const result = await service.findAll();
    expect(result).toEqual(fazendas);
  });

  it('update() should update and return fazenda', async () => {
    const data = { id: 'uuid', nome: 'Atualizado' };
    mockFazendaRepo.save.mockResolvedValue(data);

    const result = await service.update(data);
    expect(result).toEqual(data);
  });

  it('remove() should delete a fazenda by id', async () => {
    mockFazendaRepo.delete.mockResolvedValue({});

    const result = await service.remove('123');
    expect(result).toEqual({ deleted: true });
  });

  it('count() should return total number of fazendas', async () => {
    mockFazendaRepo.count.mockResolvedValue(3);

    const result = await service.count();
    expect(result).toBe(3);
  });

  it('getTotalArea() should return total area', async () => {
    const result = await service.getTotalArea();
    expect(result).toBe(100);
  });

  it('countFazendasByEstado() should return grouped count', async () => {
    const data = [{ estado: 'SC', count: 2 }];
    mockFazendaRepo.createQueryBuilder().getRawMany.mockResolvedValue(data);

    const result = await service.countFazendasByEstado();
    expect(result).toEqual(data);
  });

  it('getUsoDoSoloDistribuicao() should return uso do solo', async () => {
    const fazenda = { areaAgricultavel: 30, areaVegetacao: 70 };
    mockFazendaRepo.findOneBy.mockResolvedValue(fazenda);

    const result = await service.getUsoDoSoloDistribuicao('abc');
    expect(result).toEqual([
      { tipo: 'Agricultável', area: 30 },
      { tipo: 'Vegetação', area: 70 },
    ]);
  });

  it('getUsoDoSoloDistribuicao() should throw if fazenda not found', async () => {
    mockFazendaRepo.findOneBy.mockResolvedValue(null);

    await expect(service.getUsoDoSoloDistribuicao('not-found')).rejects.toThrow(
      NotFoundException,
    );
  });
});
