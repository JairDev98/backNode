import { response } from 'express';
import { getCustomRepository } from 'typeorm';

import Doctor from '../models/Doctor';
import DoctorRepository from '../repositories/DoctorsRepository';

interface Request {
  name: string;
  crm: string;
  phoneF: string;
  phoneC: string;
  cep: string;
  specialties: string;
}

class CreateDoctorService {
  public async execute({
    name,
    crm,
    phoneF,
    phoneC,
    cep,
    specialties,
  }: Request): Promise<Doctor> {
    const doctorRepository = getCustomRepository(DoctorRepository);

    const findCrm = await doctorRepository.findCrm(crm);

    // RESPOSTA DA API DOS CORREIOS AO QUAL NÃO CONSEGUI IMPLEMENTAR NO SISTEMA
    /**
     * MINHA IDÉIA ORIGINAL ERA PESQUISAR O CEP INFORMADO ASSIM QUE ENVIADO E DEPOIS GRAVA-LO COMO UM OBJETO JUNTAMENTE COM O CADASTRO DO NOVO MÉDICO
     */
    const {
      logradouro,
      bairro,
      localidade,
      uf,
    } = await doctorRepository.findCep(cep.replace('-', ''));

    const adress = { cep, logradouro, bairro, localidade, uf };
    console.log(adress);

    if (findCrm) {
      throw new Error('CRM already registered');
    }

    const doctor = doctorRepository.create({
      name,
      crm,
      phoneF,
      phoneC,
      cep,
      specialties,
    });

    await doctorRepository.save(doctor);

    return doctor;
  }
}

export default CreateDoctorService;
