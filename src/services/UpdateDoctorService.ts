import { getRepository } from 'typeorm';

import Doctor from '../models/Doctor';

interface Request {
  id: string;
  name: string;
  phoneF: string;
  phoneC: string;
  cep: string;
  specialties: string;
}

class UpdateDoctorService {
  public async execute({
    id,
    name,
    phoneF,
    phoneC,
    cep,
    specialties,
  }: Request): Promise<Doctor> {
    const doctorRepository = getRepository(Doctor);

    const doctorId = await doctorRepository.findOne(id);

    if (!doctorId) {
      throw new Error('This id not existis');
    }

    const doctor = doctorRepository.create({
      id,
      name,
      phoneF,
      phoneC,
      cep,
      specialties,
    });

    await doctorRepository.save(doctor);

    return doctor;
  }
}

export default UpdateDoctorService;
