import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fazenda } from './fazendas.entity';

@Injectable()
export class FazendasService {
  constructor(
    @InjectRepository(Fazenda)
    private readonly repo: Repository<Fazenda>,
  ) {}

  create(data: Partial<Fazenda>) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  async update(data: Partial<Fazenda>) {
    const areaAgricultavel = data.areaAgricultavel ?? 0;
    const areaVegetacao = data.areaVegetacao ?? 0;
    const soma = areaAgricultavel + areaVegetacao;
    if (data.areaTotal !== undefined && soma > data.areaTotal) {
      throw new BadRequestException('Soma das áreas inválida');
    }

    return this.repo.save(data);
  }

  async remove(id: string) {
    await this.repo.delete({ id });
    return { deleted: true };
  }

  async count(): Promise<number> {
    return this.repo.count();
  }

  async getTotalArea(): Promise<number> {
    const result = await this.repo
      .createQueryBuilder('fazenda')
      .select('SUM(fazenda.areaTotal)', 'totalArea')
      .getRawOne();

    return Number(result?.totalArea) || 0;
  }

  async countFazendasByEstado(): Promise<{ estado: string; count: number }[]> {
    return this.repo
      .createQueryBuilder('fazenda')
      .select('fazenda.estado', 'estado')
      .addSelect('COUNT(*)', 'count')
      .groupBy('fazenda.estado')
      .getRawMany();
  }

  async getUsoDoSoloDistribuicao(fazendaId: string) {
    const fazenda = await this.repo.findOneBy({ id: fazendaId });

    if (!fazenda) {
      throw new NotFoundException('Fazenda não encontrada');
    }

    return [
      { tipo: 'Agricultável', area: fazenda.areaAgricultavel },
      { tipo: 'Vegetação', area: fazenda.areaVegetacao },
    ];
  }
}
