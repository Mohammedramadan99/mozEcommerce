import jwt from "jsonwebtoken";
import User from "../Modal/userModel";
import db from '../utils/db/dbConnect'
const signToken = (user) =>
{
  console.log("ss");
  console.log(process.env.JWT_SECRET);
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },

    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};
const isAuth = async (req, res, next) =>
{
  await db.connect()
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer"))
  {
    token = req.headers.authorization.split(" ")[1];
    try
    {
      if (token)
      {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const { id } = decoded
        //find the user by id
        const user = await User.findById(decoded?.id).select("-password");
        console.log("is Auth: " + user._id);
        //attach the user to the request object
        req.user = user;
        next();
      }
    } catch (error)
    {
      throw new Error(error.message);
    }
  } else
  {
    throw new Error("There is no token attached to the header");
  }
  await db.disconnect()

};

const isAdmin = async (req, res, next) =>
{
  if (req.user.isAdmin)
  {
    next();
  } else
  {
    res.status(401).send({ message: "User is not admin" });
  }
};

export { signToken, isAuth, isAdmin };
