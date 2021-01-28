import { EntityRepository, Repository } from 'typeorm';
import api from '../services/api';

import Doctor from '../models/Doctor';

interface Cep {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

@EntityRepository(Doctor)
class DoctorRepository extends Repository<Doctor> {
  // BUSCA DE CRM PELO SISTEMA, CASO UM MESMO CRM JÁ ESTEJA CADASTRADO O SISTEMA RETORNA UM BOOLEANO PARA ONDE FOI CHAMADA
  public async findCrm(crm: string): Promise<Doctor | null> {
    const findCrm = await this.findOne({
      where: { crm },
    });

    return findCrm || null;
  }

  public async findCep(cep: string): Promise<Cep> {
    try {
      const response = await api.get<Cep>(`/${cep}/json`);

      const repository = response.data;

      return repository;
    } catch (err) {
      throw new Error('Cep not existis');
    }
  }
}

export default DoctorRepository;
