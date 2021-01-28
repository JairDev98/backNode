import { Router } from 'express';

import doctorRouter from './doctor.route';
import specialtyRouter from './specialty.route';

const routes = Router();
routes.use('/doctor', doctorRouter);
routes.use('/specialty', specialtyRouter);

export default routes;
