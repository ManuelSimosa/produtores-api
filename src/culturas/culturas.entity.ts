import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Fazenda } from '../fazendas/fazendas.entity';

@Entity()
export class Cultura {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fazendaId: string;

  @ManyToOne(() => Fazenda, fazenda => fazenda.culturas, { eager: false })
  @JoinColumn({ name: 'fazendaId' })
  fazenda: Fazenda;

  @Column()
  rubro: string;

  @Column()
  area: number;

  @Column()
  safra: number;
}
