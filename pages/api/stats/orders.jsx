import nc from 'next-connect'
import db from '../../../utils/db/dbConnect'


import Order from "../../../Modal/orderModel"
const handler = nc()

handler.get(async (req, res) =>
{
  await db.connect();
  const query = req.query.new
  try
  {
    const orders = query 
      ? await Order.find().sort({ _id: -1 }).limit(4) // just in case new is true then : get only last 4 orders 
      : await Order.find().sort({ _id: -1}) // in case new is false : i need all orders 
    res.status(200).json({
      success: true,
      orders,
    })
  } catch (error)
  {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
  await db.disconnect();
})
export default handler