const mongoose = require("mongoose");
const validator = require("validator");
const {encryptPassword, checkPassword} = require("../bcrypt");
const { generate_token } = require("../jwt");
const { model } = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate: {
      validator: (pass) =>
        validator.isStrongPassword(pass, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        }),
      message:
        "Password must contain at least 8 characters, including uppercase, lowercase, number, and symbol.",
    },
  },
  type: {
    type: String,
    enum: ["STUDENT","LIBRARIAN"],
    default: "STUDENT",
  },
  tokens: {
    type: [{token: String}],
  },
},{timestamps: true});

UserSchema.pre("save", async function(next) {
    const user = this;
    if(user.modifiedPaths().includes("password")){
        user.password = await encryptPassword(user.password);
    }
    next();
});

UserSchema.statics.findByEmailAndPasswordForAuth = async (email,password) => {
  try {
    const user = await User.findOne({email});
    if(!user) {
      throw new Error("Login Failed: Invalid Email address");
    }
    const isMatch = await checkPassword(password,user.password);
    
    if(!isMatch) {
      throw new Error("Login Failed: Invalid Password");
    }

    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

UserSchema.methods.generateToken = function () {
  const user = this;
  const token = generate_token(user);
  user.tokens.push({token});
  user.save();
  return token;
};

UserSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.tokens;
  return user;
}

const User = model("User",UserSchema);
module.exports = User;