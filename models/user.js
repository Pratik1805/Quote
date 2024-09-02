import  {model, models, Schema} from 'mongoose';

const UserSchema = new Schema({
    email:{
        type: String,
        unique:[true, 'Email already exists!'], //message if it fails
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
    },
    image: {
        type: String,
    }
});

const User = models.User || model("User", UserSchema);

export default User;