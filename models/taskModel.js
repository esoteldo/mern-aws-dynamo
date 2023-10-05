import dynamoose from 'dynamoose'  

const taskSchema= new dynamoose.Schema({
    id:{
        type: String,
        hashKey: true,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now, 
    },
    user:{
        type:String,
        required:true,
        index: {
            name: "user",
            global: true
          },
    }
},
{
    timestamps:true
});

const Task= dynamoose.model("Task",taskSchema,{
    create: true,
    throughput: "ON_DEMAND"
});

export default Task;