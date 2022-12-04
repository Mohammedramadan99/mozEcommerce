import nc from 'next-connect'

import db from '../../../utils/db/dbConnect'
import User from "../../../Modal/userModel"

const ErrorHandler = require("../../../utils/errorHandler");
const handler = nc();

// create product --> admin


handler.get(async (req, res) =>
{
  await db.connect();
  try
  {
    const user = await User.findById(req.query.id);

    // status Error
    if (!user)
    {
      return next(new ErrorHandler("user not found", 404));
    }

    // status success
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err)
  {
    return res.status(500).json({ message: err.message });
  }
  await db.disconnect();
})

handler.delete(async (req, res) =>
{
  await db.connect();
  try
  {
    console.log("req.params", req.query.id)
    let user = await User.findById(req.query.id);

    // status case error
    if (!user)
    {
      return res.status(500).json({
        success: false,
        message: "user not fount",
      });
    }

    // operator <- delete ->
    await user.remove();

    // status case success
    res.status(200).json({
      success: true,
      message: "user Deleted",
    });
  } catch (err)
  {
    return res.status(500).json({ message: err.message });
  }
  await db.disconnect();
})

export default handler