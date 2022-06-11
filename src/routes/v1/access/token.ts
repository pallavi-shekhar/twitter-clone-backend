import express from 'express';
import validator, { ValidationSource } from '../../../middlewares/validator';
import schema from './schema';
import TokenController from '../../../controllers/access/token.controller';

const router = express.Router();

router.post('/refresh', validator(schema.auth, ValidationSource.HEADER), validator(schema.refreshToken), TokenController.token);

export default router;
