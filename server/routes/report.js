import { Router } from 'express';

import controllers from '../controllers';

const router = Router();
router.get('/:lat/:long/:sort', controllers.getCloseReports);
router.post('/', controllers.postReport);

export default router;