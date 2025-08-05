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
        "https://www.bing.com/images/search?view=detailV2&ccid=vmoycMUO&id=46A5C8C5560773A0FD9F930D58E6E83B4A541BCA&thid=OIP.vmoycMUOmbcs0Vw-1iIdVAHaHa&mediaurl=https%3a%2f%2fcdn.pixabay.com%2fphoto%2f2023%2f02%2f18%2f11%2f00%2ficon-7797704_1280.png&exph=1280&expw=1280&q=default+profilepic+pixabay&simid=608006695580105101&FORM=IRPRST&ck=E42DADCB39E0BCD8D8657D24C2015E0F&selectedIndex=7&itb=0",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
