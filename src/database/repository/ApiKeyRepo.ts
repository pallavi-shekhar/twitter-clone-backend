import ApiKey, { ApiKeyModel } from "../model/ApiKey";

export default class ApiKeyRepo{
    public static async findByKey(key: string): Promise<ApiKey| null> {
        
        return ApiKeyModel.findOne({ key: key, status: true}).lean<ApiKey>().exec();
    }

}