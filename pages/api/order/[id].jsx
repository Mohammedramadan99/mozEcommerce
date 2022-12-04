import nc from 'next-connect'
import db from '../../../utils/db/dbConnect'
import Order from '../../../Modal/orderModel'
const handler = nc()


handler.get(async (req, res) =>
{
  await db.connect()
  try
  {
    const order = await Order.findById(req.query.id)
    res.status(200).json({
      success: true,
      order
    })
    // const savedOrder = await newOrder.save()
    // if (paymentIntentId)
  } catch (error)
  {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})
handler.put(async (req, res) =>
{
  try
  {
    const updatedOrders = await Order.findByIdAndUpdate(
      req.query?.id,
      {
        $set: req.body
      }, 
      {new:true}
    )
    res.status(200).json(updatedOrders)
  } catch (error)
  {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

export default handler