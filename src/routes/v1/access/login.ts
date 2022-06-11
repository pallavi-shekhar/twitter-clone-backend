import express from 'express';
import validator from '../../../middlewares/validator';
import schema from './schema';
import _ from 'lodash';
import LoginController from '../../../controllers/access/login.controller';

const router = express.Router();

router.post('/basic', validator(schema.userCredential), LoginController.login);

export default router;