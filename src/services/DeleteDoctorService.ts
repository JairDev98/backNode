import { getCustomRepository } from 'typeorm';

import DoctorsRepository from '../repositories/DoctorsRepository';

class DeleteDoctorService {
  public async execute(id: string): Promise<void> {
    const doctorRepository = getCustomRepository(DoctorsRepository);

    const doctor = await doctorRepository.findOne(id);

    if (!doctor) {
      throw new Error('Doctor not existt');
    }

    await doctorRepository.delete(doctor);
  }
}

export default DeleteDoctorService;
