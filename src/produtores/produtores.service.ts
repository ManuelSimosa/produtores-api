import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produtor } from './produtores.entity';

@Injectable()
export class ProdutoresService {
  constructor(
    @InjectRepository(Produtor)
    private readonly repo: Repository<Produtor>,
  ) {}

  async create(data: Partial<Produtor>) {
    const existe = await this.repo.findOne({
      where: { identidade: data.identidade },
    });
    if (existe) {
      throw new BadRequestException(
        'CPF/CNPJ já está cadastrado para outro produtor.',
      );
    }
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  update(data: Partial<Produtor>) {
    return this.repo.save(data);
  }

  async remove(id: string) {
    await this.repo.delete({ id });
    return { deleted: true };
  }
}
