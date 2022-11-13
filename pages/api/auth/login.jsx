import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import db from '../../../utils/db/dbConnect'
import cloudinary from "cloudinary"
import sendToken from '../../../utils/createToken'
import User from "../../../Modal/userModel"
import generateToken from '../../../utils/generateToken'

cloudinary.config({
  cloud_name: 'dtmjc8y9z',
  api_key: '379966828288349',
  api_secret: 'a41LSvU3XXAJuQOLxorhOVFPauw',
});

const handler = nc();



handler.post(async (req, res) =>
{
  await db.connect();
  try {
    const { email, password } = req.body;
    //check if user exists
    const userFound = await User.findOne({ email }).select('+password');
    console.log(userFound.password)
    const comparedPassword = await bcrypt.compare(password, userFound.password);
    console.log(comparedPassword)
    //check if blocked
    if (userFound && comparedPassword)
    {
      //Check if password is match
      res.json({
        _id: userFound?._id,
        name: userFound?.name,
        email: userFound?.email,
        personalImage: userFound?.personalImage,
        isAdmin: userFound?.isAdmin,
        token: generateToken(userFound?._id),
        isVerified: userFound?.isAccountVerified,
      });
    } else
    {
      res.status(401);
      throw new Error("Invalid Login Credentials");
    }
  } catch (err) {
    res.status(404).json({
      message: err.message
    })
  }
  await db.disconnect();
})
export default handler


