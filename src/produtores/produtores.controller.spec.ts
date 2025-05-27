import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoresController } from './produtores.controller';
import { ProdutoresService } from './produtores.service';
import { BadRequestException } from '@nestjs/common';
import { exemploCpf, exemploNome } from './dto/data-generator';
import { v4 as uuidv4 } from 'uuid';

describe('ProdutoresController', () => {
  let controller: ProdutoresController;
  let service: ProdutoresService;

  const produtorMock = {
    identidade: exemploCpf,
    nomeProdutor: exemploNome,
  };

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoresController],
      providers: [
        {
          provide: ProdutoresService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<ProdutoresController>(ProdutoresController);
    service = module.get<ProdutoresService>(ProdutoresService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debería crear un productor con datos válidos', async () => {
      serviceMock.create.mockResolvedValue(produtorMock);

      const result = await controller.create(produtorMock);

      expect(service.create).toHaveBeenCalledWith(produtorMock);
      expect(result).toEqual(produtorMock);
    });

    it('debería lanzar BadRequestException para datos inválidos', async () => {
      // Pass an invalid object missing required fields
      const invalidData = { identidade: '', nomeProdutor: '' };

      await expect(controller.create(invalidData)).rejects.toThrow(
        BadRequestException,
      );
      expect(service.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('debería devolver la lista de productores', async () => {
      serviceMock.findAll.mockResolvedValue([produtorMock]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([produtorMock]);
    });
  });

  describe('update', () => {
    it('debería actualizar un productor con datos válidos', async () => {
      serviceMock.update.mockResolvedValue(produtorMock);

      const result = await controller.update(produtorMock);

      expect(service.update).toHaveBeenCalledWith(produtorMock);
      expect(result).toEqual(produtorMock);
    });

    it('debería lanzar BadRequestException para datos inválidos', async () => {
      const invalidData = { identidade: '', nomeProdutor: '' };

      await expect(controller.update(invalidData)).rejects.toThrow(
        BadRequestException,
      );
      expect(service.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('debería eliminar un productor con id válido', async () => {
      serviceMock.remove.mockResolvedValue({ deleted: true });

      const mockId = uuidv4();
      const result = await controller.remove(mockId);

      expect(service.remove).toHaveBeenCalledWith(mockId);
      expect(result).toEqual({ deleted: true });
    });

    it('debería lanzar BadRequestException si id no está presente', async () => {
      await expect(controller.remove('')).rejects.toThrow(BadRequestException);
      expect(service.remove).not.toHaveBeenCalled();
    });
  });
});
