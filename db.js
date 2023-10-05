import dynamoose from 'dynamoose'
import { SECRET_ACCESS_KEY,ACCESS_KEY_ID } from './config.js';

const ddb = new dynamoose.aws.ddb.DynamoDB({
    "credentials": {
        "accessKeyId": ACCESS_KEY_ID,
        "secretAccessKey": SECRET_ACCESS_KEY
    },
    "region": "sa-east-1"
});

const setDdb=()=>{dynamoose.aws.ddb.set(ddb)}

export default setDdb;