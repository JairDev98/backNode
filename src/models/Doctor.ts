import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('doctors')
class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  crm: string;

  @Column()
  phoneF: string;

  @Column()
  phoneC: string;

  @Column()
  cep: string;

  @Column()
  specialties: string;
}

export default Doctor;
