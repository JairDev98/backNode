import { getRepository } from 'typeorm';

import Specialty from '../models/Specialty';

interface Request {
  specialty: string;
}

class CreateSpecialtyService {
  public async execute({ specialty }: Request): Promise<Specialty> {
    const doctorRepository = getRepository(Specialty);

    const checkSpecialtyExists = await doctorRepository.findOne({
      where: { specialty },
    });

    if (checkSpecialtyExists) {
      throw new Error('Specialty already registered');
    }

    const nSpecialty = doctorRepository.create({ specialty });

    await doctorRepository.save(nSpecialty);

    return nSpecialty;
  }
}

export default CreateSpecialtyService;
