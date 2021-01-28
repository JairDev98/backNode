import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import DoctorRepository from '../repositories/DoctorsRepository';
import CreateDoctorService from '../services/CreateDoctorService';
import DeleteDoctorService from '../services/DeleteDoctorService';
import UpdateDoctorService from '../services/UpdateDoctorService';

const doctorRouter = Router();

// AS ROTAS PATH E DELETE PESQUISAM POR MEIO DO ID DO MÉDICO CADASTRADO NO SISTEMA, ENTRETANTO NO MEU PLANO ORIGINAL ESSA PESQUISA SERIA EFETUADA POR CRM QUE JÁ É UM REGISTRO UNICO

doctorRouter.post('/', async (request, response) => {
  try {
    const { name, crm, phoneF, phoneC, cep, specialties } = request.body;

    if ((name as string).length > 120) {
      return response
        .status(403)
        .json('O nome deve conter menos de 120 caracteres');
    }

    const createSpecialty = new CreateDoctorService();

    const doctor = await createSpecialty.execute({
      name,
      crm,
      phoneF,
      phoneC,
      cep,
      specialties,
    });

    return response.json(doctor);
  } catch (error) {
    return response.status(403).json({ message: 'CRM already registered' });
  }
});

// COMO CRM É UM DOCUMENTO UNICO É O UNICO CAMPO QUE NÃO PODE SER ALTERADO

doctorRouter.patch('/:id', async (request, response) => {
  const { id } = request.params;

  const { name, phoneF, phoneC, cep, specialties } = request.body;

  const updateDoctor = new UpdateDoctorService();

  const doctor = await updateDoctor.execute({
    id,
    name,
    phoneF,
    phoneC,
    cep,
    specialties,
  });

  return response.json(doctor);
});

doctorRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteDoctor = new DeleteDoctorService();

  await deleteDoctor.execute(id);

  return response.status(204).send();
});

doctorRouter.get('/', async (request, response) => {
  const doctorRepository = getCustomRepository(DoctorRepository);

  const doctors = await doctorRepository.find();

  return response.json(doctors);
});

export default doctorRouter;
