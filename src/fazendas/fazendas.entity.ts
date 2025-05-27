import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Produtor } from '../produtores/produtores.entity';
import { Cultura } from '../culturas/culturas.entity';

@Entity()
export class Fazenda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  produtorId: string;

  @ManyToOne(() => Produtor, { eager: false })
  @JoinColumn({ name: 'produtorId' })
  produtor: Produtor;

  @Column()
  nome: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  areaTotal: number;

  @Column()
  areaAgricultavel: number;

  @Column()
  areaVegetacao: number;

  @OneToMany(() => Cultura, (cultura) => cultura.fazenda)
  culturas: Cultura[];
}
