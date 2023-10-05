import dynamoose from 'dynamoose'

const userSchema =new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true,
        required:true,
      },
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index: {
            name: "email",
            global: true
          },
    },
    password:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

const User= dynamoose.model('User',userSchema,{
    create: true,
    throughput: "ON_DEMAND"
});

export default User;