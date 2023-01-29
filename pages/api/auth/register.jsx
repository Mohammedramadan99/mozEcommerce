import nc from 'next-connect'

import db from '../../../utils/db/dbConnect'
import cloudinary from "cloudinary"
import sendToken from '../../../utils/createToken'
import User from "../../../Modal/userModel"
import { photoUpload } from '../../../utils/uploadingImg'
cloudinary.config({
  cloud_name: 'dtmjc8y9z',
  api_key: '379966828288349',
  api_secret: 'a41LSvU3XXAJuQOLxorhOVFPauw',
});

const handler = nc();



handler.post(async (req, res) =>
{
  await db.connect();
  try
  {
    const myCloud = await cloudinary.v2.uploader.upload(req.body?.images[0], {
      folder: "avatars",
    });
    // ?recieve the info of user
    const { name, email, password, role } = req.body;
    // ?find the user to check if it exists before or not
    const existUser = await User.findOne({ email });
    // ?FIRST => "check email" case email already found
    if (existUser)
      return res.status(400).json({ message: "the email already exists" });

    // ?SECOND => "check password" case password less than 6ch
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "password is at least 6 characters long" });
    // ?third => case the user is new -- we will collect its info in a constant
    console.log(req.body);
    // const user = await User.create(req.body);
    const user = await User.create({
      name,
      email,
      password,
      personalImage: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    res.status(200).json({
      user
    })
  } catch (err)
  {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
  await db.disconnect();

})
export default handler
