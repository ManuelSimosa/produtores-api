import { Test, TestingModule } from '@nestjs/testing';
import { FazendasController } from './fazendas.controller';
import { FazendasService } from './fazendas.service';
import { BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('FazendasController', () => {
  let controller: FazendasController;
  let service: FazendasService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    count: jest.fn(),
    getTotalArea: jest.fn(),
    countFazendasByEstado: jest.fn(),
    getUsoDoSoloDistribuicao: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FazendasController],
      providers: [
        {
          provide: FazendasService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<FazendasController>(FazendasController);
    service = module.get<FazendasService>(FazendasService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('deve criar fazenda válida', async () => {
      const dto = {
        nome: 'Fazenda 1',
        estado: 'SC',
        cidade: 'Chapecó',
        areaTotal: 100,
        areaAgricultavel: 60,
        areaVegetacao: 40,
        produtorId: uuidv4(),
      };

      mockService.create.mockResolvedValue(dto);

      const result = await controller.create(dto);
      expect(result).toEqual(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('deve lançar erro se soma das áreas for inválida', async () => {
      const dto = {
        nome: 'Fazenda Inválida',
        estado: 'SC',
        cidade: 'Chapecó',
        areaTotal: 100,
        areaAgricultavel: 70,
        areaVegetacao: 40,
        produtorId: uuidv4(),
      };

      await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('deve lançar erro se DTO for inválido (validação Joi)', async () => {
      const dto = {
        estado: 'SC',
        cidade: 'Chapecó',
        areaTotal: 100,
        areaAgricultavel: 50,
        areaVegetacao: 50,
        produtorId: uuidv4(),
      };

      await expect(controller.create(dto as any)).rejects.toThrow(BadRequestException);
    });

    it('deve lançar erro se áreas forem string em vez de número', async () => {
      const dto = {
        nome: 'Fazenda Tipos Errados',
        estado: 'SC',
        cidade: 'Chapecó',
        areaTotal: '100', 
        areaAgricultavel: '60', 
        areaVegetacao: '40', 
        produtorId: uuidv4(),
      };

      await expect(controller.create(dto as any)).rejects.toThrow(BadRequestException);
    });

  });

  it('findAll() deve retornar todas as fazendas', async () => {
    const data = [{ nome: 'Fazenda A' }];
    mockService.findAll.mockResolvedValue(data);

    const result = await controller.findAll();
    expect(result).toEqual(data);
  });

  it('count() deve retornar quantidade de fazendas', async () => {
    mockService.count.mockResolvedValue(5);

    const result = await controller.count();
    expect(result).toBe(5);
  });

  it('getTotalArea() deve retornar área total', async () => {
    mockService.getTotalArea.mockResolvedValue(300);

    const result = await controller.getTotalArea();
    expect(result).toEqual({ totalArea: 300 });
  });

  it('countByEstado() deve retornar mapeamento por estado', async () => {
    const mock = [{ estado: 'SC', count: 2 }];
    mockService.countFazendasByEstado.mockResolvedValue(mock);

    const result = await controller.countByEstado();
    expect(result).toEqual(mock);
  });

  it('usoDoSolo() deve retornar distribuição de uso do solo', async () => {
    const mock = [
      { tipo: 'Agricultável', area: 50 },
      { tipo: 'Vegetação', area: 50 },
    ];

    mockService.getUsoDoSoloDistribuicao.mockResolvedValue(mock);

    const result = await controller.usoDoSolo('some-id');
    expect(result).toEqual(mock);
    expect(service.getUsoDoSoloDistribuicao).toHaveBeenCalledWith('some-id');
  });

  describe('update()', () => {
    it('deve atualizar fazenda com sucesso', async () => {
      const dto = {
        nome: 'Fazenda Atualizada',
        estado: 'RS',
        cidade: 'Pelotas',
        areaTotal: 100,
        areaAgricultavel: 50,
        areaVegetacao: 50,
        produtorId: uuidv4(),
      };

      mockService.update.mockResolvedValue(dto);

      const result = await controller.update(dto);
      expect(result).toEqual(dto);
    });

    it('deve lançar erro se soma das áreas for inválida', async () => {
      const dto = {
        nome: 'Erro Soma',
        estado: 'RS',
        cidade: 'Pelotas',
        areaTotal: 100,
        areaAgricultavel: 70,
        areaVegetacao: 50,
        produtorId: uuidv4(),
      };

      mockService.update.mockImplementation(() => {
        throw new BadRequestException('Soma das áreas inválida');
      });

      await expect(controller.update(dto)).rejects.toThrow(BadRequestException);
    });

    it('deve lançar erro se DTO inválido (Joi)', async () => {
      const dto = {
        cidade: 'Blumenau',
        estado: 'SC',
        areaTotal: 100,
        areaAgricultavel: 50,
        areaVegetacao: 50,
        produtorId: uuidv4(),
      };

      await expect(controller.update(dto as any)).rejects.toThrow(BadRequestException);
    });

  });

  describe('remove()', () => {
    it('deve remover com sucesso', async () => {
      mockService.remove.mockResolvedValue({ deleted: true });

      const result = await controller.remove('123');
      expect(result).toEqual({ deleted: true });
    });

    it('deve lançar erro se id não for informado', async () => {
      // @ts-expect-error simular ausência do campo
      await expect(controller.remove(undefined)).rejects.toThrow(BadRequestException);
    });

    it('deve lançar erro se id estiver vazio (string vazia)', async () => {
      await expect(controller.remove('')).rejects.toThrow(BadRequestException);
    });

    // it('deve lançar erro se id for apenas espaços', async () => {
    //   await expect(controller.remove('   ')).rejects.toThrow(BadRequestException);
    // });
  });
});
