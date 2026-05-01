import mongoose , { Schema } from 'mongoose';
import { isEmail } from 'validator';
import bcrypt from 'bcrypt';

type UserType  = {
  name : string,
  email : string,
  password : string,
  phone? : string,
  address? : string,
  role : string
};

const userSchema = new Schema<UserType>(
  {
    name: {
      type: String,
      required: [true, "Please enter a name."],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please enter an email."],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email.']
    },

    password: {
      type: String,
      minlength : [6, "Minimum password length is 6 characters."],
      required: [true, "Please enter a password."],
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

// fire a function after doc saved to db
userSchema.post('save', function(doc, next){
  console.log('new user was created & saved', doc);
  next();
});


// fire a function before doc saved to db
userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
});


const User = mongoose.model<UserType>("User", userSchema);

export default User;