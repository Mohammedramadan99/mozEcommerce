import nc from 'next-connect'
import db from '../../../../utils/db/dbConnect'
import moment from 'moment'
import Order from "../../../../Modal/orderModel"
const handler = nc()

handler.get(async (req, res) =>
{
  await db.connect();
  try
  {
    const prevMonth = moment()
      .month(moment().month() - 1)
      .set('date', 1)
      .format('YYYY-MM-DD HH:mm:ss');
    // const allUsers = await User.find({});
    const orders = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(prevMonth) } },
      },
      {
        $project: {
          month:{$month:"$createdAt"},
        },
      },
      {
        $group:{
          _id: "$month", // month
          total:{$sum:1}
        }
      },
    ])
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