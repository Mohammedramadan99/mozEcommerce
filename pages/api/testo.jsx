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
    console.log("hello mo")
    res.status(201).json({
      success: true,
      msg:"good",
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