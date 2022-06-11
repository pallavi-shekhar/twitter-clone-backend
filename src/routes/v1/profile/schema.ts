import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../middlewares/validator';

export default {
    userId: Joi.object().keys({
        id: JoiObjectId().required()
    })
};