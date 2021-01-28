import { Router } from 'express';

import CreateSpecialtyService from '../services/CreateSpecialtyService';

const specialtyRouter = Router();
// AS ESPECIALIDADES SÃO CADASTRADAS DE FORMAS UNICAS COM VALIDAÇÃO DE DUPLICIDADE
specialtyRouter.post('/', async (request, response) => {
  try {
    const { specialty } = request.body;

    const createSpecialty = new CreateSpecialtyService();

    const nSpecialty = await createSpecialty.execute({
      specialty,
    });

    return response.json(nSpecialty);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default specialtyRouter;
