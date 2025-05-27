import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoresService } from './produtores.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Produtor } from './produtores.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('ProdutoresService', () => {
  let service: ProdutoresService;
  let repo: Repository<Produtor>;

  const produtorMock = {
    id: 'uuid-1234',
    identidade: '12345678900',
    nomeProdutor: 'João da Silva',
  };

  const mockRepo = {
    findOne: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoresService,
        {
          provide: getRepositoryToken(Produtor),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ProdutoresService>(ProdutoresService);
    repo = module.get<Repository<Produtor>>(getRepositoryToken(Produtor));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debería crear un productor si el CPF/CNPJ no existe', async () => {
      mockRepo.findOne.mockResolvedValue(undefined);
      mockRepo.save.mockResolvedValue(produtorMock);

      const result = await service.create(produtorMock);

      expect(mockRepo.findOne).toHaveBeenCalledWith({
        where: { identidade: produtorMock.identidade },
      });
      expect(mockRepo.save).toHaveBeenCalledWith(produtorMock);
      expect(result).toEqual(produtorMock);
    });

    it('debería lanzar BadRequestException si el CPF/CNPJ ya existe', async () => {
      mockRepo.findOne.mockResolvedValue(produtorMock);

      await expect(service.create(produtorMock)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockRepo.findOne).toHaveBeenCalledWith({
        where: { identidade: produtorMock.identidade },
      });
      expect(mockRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('debería retornar un array de productores', async () => {
      mockRepo.find.mockResolvedValue([produtorMock]);

      const result = await service.findAll();

      expect(mockRepo.find).toHaveBeenCalled();
      expect(result).toEqual([produtorMock]);
    });
  });

  describe('update', () => {
    it('debería actualizar y retornar el productor', async () => {
      mockRepo.save.mockResolvedValue(produtorMock);

      const result = await service.update(produtorMock);

      expect(mockRepo.save).toHaveBeenCalledWith(produtorMock);
      expect(result).toEqual(produtorMock);
    });
  });

  describe('remove', () => {
    it('debería eliminar un productor por id y retornar confirmación', async () => {
      mockRepo.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(produtorMock.id);

      expect(mockRepo.delete).toHaveBeenCalledWith({ id: produtorMock.id });
      expect(result).toEqual({ deleted: true });
    });
  });
});
