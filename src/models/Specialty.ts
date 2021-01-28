import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('specialties')
class Specialty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  specialty: string;
}

export default Specialty;
