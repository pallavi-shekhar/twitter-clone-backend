import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../middlewares/validator';

export default {
    tweetId: Joi.object().keys({
        id: JoiObjectId().required()
    })
};