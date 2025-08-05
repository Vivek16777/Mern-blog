import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "server:User name is required"],
      unique: [true, "server:username is not available"],
      trim: true,
      minLength: [3, "server:username must be at least 3 characters"],
      maxLength: [20, "server:username must be at most 20 characters"],
    },
    email: {
      type: String,
      required: [true, "server:User Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minLength: [5, "server:Email must be at least 5 characters"],
      maxLength: [255, "server:Email must be at most 255 characters"],
      match: [/\S+@\S+\.\S+/, "server:please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "server:Password must be at least 6 characters"],
      maxLength: 1024,
    },
    profilePicture: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/024/983/914/large_2x/simple-user-default-icon-free-png.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
