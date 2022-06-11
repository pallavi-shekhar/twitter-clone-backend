import express from 'express';
import validator, { ValidationSource } from '../../../middlewares/validator';
import authentication from '../../../middlewares/authentication';
import schema from './schema';
import UnfollowController from '../../../controllers/follow/unfollow.controller';

const router = express.Router();

router.delete('/id/:id', authentication, validator(schema.followeeId, ValidationSource.PARAM), UnfollowController.unfollow);

export default router;