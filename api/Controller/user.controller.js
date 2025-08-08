import bcryptjs from "bcryptjs";
import User from "../Models/User.model.js";
import { errorHandler } from "../Utils/error.js";

export const test = (req, res) => {
  res.json({ message: "Api is working!" });
};
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You can only update your own account!", res)
    );
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "Password must be at least 6 characters long!", res)
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 3 || req.body.username.length > 20) {
      return next(
        errorHandler(
          400,
          "Username must be between 3 and 20 characters long!",
          res
        )
      );
    }
    if (!/^[a-zA-Z0-9]+$/.test(req.body.username)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers!", res)
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces!", res));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be in lowercase!", res));
    }
    if (!req.body.username.match(/^[a-z0-9]+$/)) {
      return next(
        errorHandler(
          400,
          "Username can only contain lowercase letters and numbers!",
          res
        )
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(errorHandler(500, "An error occurred while updating the user!"));
  }
};
