import express from 'express';
import apiKey from '../../middlewares/apikey';

const router = express.Router();

router.use('/', apiKey);


export default router;

