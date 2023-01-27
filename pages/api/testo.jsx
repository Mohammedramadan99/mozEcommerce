import nc from 'next-connect'

import db from '../../utils/db/dbConnect'

import User from "../../Modal/userModel"


const handler = nc();

// get all products 
handler.get(async (req, res) =>
{
  await db.connect();
  try
  { 
    const data = req.body
    res.status(201).json({
      success: true,
      msg:"good",
      data
    });
  } catch (err)
  {
    res.status(404).json({
      message: err.message
    })
  }
  await db.disconnect();
})

export default handler