import Joi from '@hapi/joi';
import { JoiAuthBearer } from '../../../middlewares/validator';

export default {
    signup: Joi.object().keys({
        username: Joi.string().required().min(3),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        bio: Joi.string().optional(),
        dateOfBirth: Joi.date().optional()
    }),
    userCredential: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required() 
      }),
    auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
    refreshToken: Joi.object().keys({
        refreshToken: Joi.string().required().min(1),
      })
};