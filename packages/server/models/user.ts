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

interface UserModel extends mongoose.Model<UserType> {
  login(email: string, password: string): Promise<mongoose.Document<unknown, {}, UserType> & UserType & { _id: mongoose.Types.ObjectId }>;
}

const userSchema = new Schema<UserType, UserModel>(
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

// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model<UserType, UserModel>("User", userSchema);

export default User;