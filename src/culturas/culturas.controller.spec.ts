import { Test, TestingModule } from '@nestjs/testing';
import { CulturasController } from './culturas.controller';
import { CulturasService } from './culturas.service';
import { BadRequestException } from '@nestjs/common';
import { CreateCulturaDto } from './dto/create-cultura.dto';
import { v4 as uuidv4 } from 'uuid';

describe('CulturasController', () => {
  let controller: CulturasController;
  let service: CulturasService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByFazendaId: jest.fn(),
    countCulturasByRubro: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CulturasController],
      providers: [{ provide: CulturasService, useValue: mockService }],
    }).compile();

    controller = module.get<CulturasController>(CulturasController);
    service = module.get<CulturasService>(CulturasService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create()', () => {
    it('deve criar cultura com sucesso', async () => {
      const dto: CreateCulturaDto = {
        fazendaId: uuidv4(),
        safra: 2025,
        area: 20,
        rubro: 'Soja',
      };
      mockService.create.mockResolvedValue(dto);
      const result = await controller.create(dto);
      expect(result).toEqual(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('deve lançar exceção se DTO for inválido', async () => {
      const dto: any = {}; // inválido
      await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll()', () => {
    it('deve retornar lista de culturas', async () => {
      const data = [{ rubro: 'Milho' }];
      mockService.findAll.mockResolvedValue(data);
      const result = await controller.findAll();
      expect(result).toEqual(data);
    });
  });

  describe('findByFazenda()', () => {
    it('deve retornar culturas da fazenda', async () => {
      const data = [{ rubro: 'Arroz' }];
      mockService.findByFazendaId.mockResolvedValue(data);
      const result = await controller.findByFazenda('1');
      expect(result).toEqual(data);
    });

    it('deve lançar exceção se fazendaId não for fornecido', async () => {
      await expect(controller.findByFazenda(undefined as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('countByRubro()', () => {
    it('deve retornar dados agregados', async () => {
      const data = { Soja: 3, Milho: 2 };
      mockService.countCulturasByRubro.mockResolvedValue(data);
      const result = await controller.countByRubro();
      expect(result).toEqual(data);
    });
  });

  describe('update()', () => {
    it('deve atualizar cultura com sucesso', async () => {
      const dto: CreateCulturaDto = {
        fazendaId: uuidv4(),
        safra: 2025,
        area: 10,
        rubro: 'Soja',
      };
      mockService.update.mockResolvedValue(dto);
      const result = await controller.update(dto);
      expect(result).toEqual(dto);
      expect(service.update).toHaveBeenCalledWith(dto);
    });

    it('deve lançar exceção se DTO for inválido', async () => {
      const dto: any = {};
      await expect(controller.update(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove()', () => {
    it('deve remover cultura com sucesso', async () => {
      const id = 'abc123';
      mockService.remove.mockResolvedValue({ deleted: true });
      const result = await controller.remove(id);
      expect(result).toEqual({ deleted: true });
      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('deve lançar exceção se id não for fornecido', async () => {
      await expect(controller.remove(undefined as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
