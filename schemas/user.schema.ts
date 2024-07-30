import { Schema } from 'mongoose';

interface UserDataProps {
        _id : object;
        email : string;
        password : string;
        name : string;
        phone : string;
        createdAt?: Date;
        updatedAt?: Date;
}

const userSchema = new Schema<UserDataProps>({
  name: { type: String, required: true },
  email: { trpe: String, required: true, unique: true },
  password : { type: String, required: true },
  phone : { type: String, required: true },
  createdAt : {type: Date, default: Date.now},
 
}
);

export  { userSchema, UserDataProps };
