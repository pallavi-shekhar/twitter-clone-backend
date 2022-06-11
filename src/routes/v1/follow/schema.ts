import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../middlewares/validator';

export default {
    followeeId: Joi.object().keys({
        id: JoiObjectId().required()
    }),
    userId: Joi.object().keys({
        id: JoiObjectId().required()
    })
}