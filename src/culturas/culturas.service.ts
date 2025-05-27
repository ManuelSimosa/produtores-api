import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cultura } from './culturas.entity';
import { Fazenda } from '../fazendas/fazendas.entity';

@Injectable()
export class CulturasService {
  constructor(
    @InjectRepository(Cultura)
    private culturaRepository: Repository<Cultura>,

    @InjectRepository(Fazenda)
    private fazendaRepository: Repository<Fazenda>,
  ) {}

  async create(data: Partial<Cultura>) {
    const fazenda = await this.fazendaRepository.findOne({
      where: { id: data.fazendaId },
      relations: ['culturas'],
    });

    if (!fazenda) {
      throw new BadRequestException('Fazenda não encontrada');
    }

    const culturasExistentes = await this.culturaRepository.find({
      where: { fazenda: { id: data.fazendaId } },
    });

    const areaOcupadaNaSafra = culturasExistentes
      .filter((c) => c.fazendaId === data.fazendaId && c.safra === data.safra)
      .reduce((total, c) => total + c.area, 0);

    if (typeof data.area !== 'number') {
      throw new BadRequestException('Área da cultura deve ser informada');
    }

    if (areaOcupadaNaSafra + data.area > fazenda.areaTotal) {
      throw new BadRequestException(
        `Área total da fazenda (${fazenda.areaTotal}) excedida: área já utilizada (${areaOcupadaNaSafra}), nova cultura excede limite.`,
      );
    }

    const cultura = this.culturaRepository.create({
      ...data,
      fazenda: fazenda,
    });

    return this.culturaRepository.save(cultura);
  }

  findAll() {
    return this.culturaRepository.find();
  }

  findByFazendaId(fazendaId: string) {
    return this.culturaRepository.find({
      where: { fazenda: { id: fazendaId } },
    });
  }

  update(data: Partial<Cultura>) {
    return this.culturaRepository.save(data);
  }

  async remove(id: string) {
    await this.culturaRepository.delete({ id });
    return { deleted: true };
  }

  async countCulturasByRubro(): Promise<{ rubro: string; count: number }[]> {
    return this.culturaRepository
      .createQueryBuilder('cultura')
      .select('cultura.rubro', 'rubro')
      .addSelect('COUNT(*)', 'count')
      .groupBy('cultura.rubro')
      .getRawMany();
  }
}
