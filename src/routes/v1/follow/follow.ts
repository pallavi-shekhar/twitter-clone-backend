import express from 'express';
import validator, { ValidationSource } from '../../../middlewares/validator';
import authentication from '../../../middlewares/authentication';
import schema from './schema';
import FollowController from '../../../controllers/follow/follow.controller';

const router = express.Router();

router.post('/id/:id', authentication, validator(schema.followeeId, ValidationSource.PARAM), FollowController.create);

export default router;
