import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Produtor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  identidade: string;

  @Column()
  nomeProdutor: string;
}
