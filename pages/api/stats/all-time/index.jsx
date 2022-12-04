import nc from 'next-connect'
import db from '../../../../utils/db/dbConnect'


import User from "../../../../Modal/userModel"
import Order from "../../../../Modal/orderModel"
import Product from "../../../../Modal/ProductsModel"
const handler = nc()

handler.get(async (req, res) =>
{
  await db.connect();
  try
  {
    const query = req.query.numbers

    let income = await Order.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" }, // month from created at 
          sales: "$subtotal" // subtotal of the order
        },
      },
    ])
    let users = await User.find({})
    let orders = await Order.find({})
    let products = await Product.find({})
    let earnings = query ? 0 : income;
    if (query)
    {
      income = income.map(item => earnings += item.sales)
      users = users.length
      orders = orders.length
      products = products.length
      
    }
    const data = [
      { title: 'earnings', num: earnings },
      { title: 'users', num: users },
      { title: 'orders', num: orders },
      { title: 'products', num: products },
    ]
    res.status(200).json({
      success: true,
      data
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