import express from 'express';
import validator from '../../../middlewares/validator';
import schema from './schema';
import _ from 'lodash';
import SignUpController from '../../../controllers/access/signup.controller';

const router = express.Router();

router.post('/basic', validator(schema.signup), SignUpController.signUp);

export default router;