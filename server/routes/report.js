import { Router } from 'express';

import { getCloseReports, postReport} from '../controllers/report';

const router = Router();
router.get('/:lat/:long/:sort', getCloseReports);
router.post('/', postReport)

export default router;