import nc from 'next-connect'
import Product from '../../../Modal/ProductsModel'
import db from '../../../utils/db/dbConnect'
import { isAuth } from '../../../utils/auth'
import ReviewUs from '../../../Modal/reviewUs'
const handler = nc()

handler.get(async (req, res) =>
{
  await db.connect();
  try
  {
    const reviews = await ReviewUs.find({})
    res.status(200).json({
      success: true,
      reviews
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

handler.use(isAuth).post(async (req, res) =>
{
  await db.connect();
  try {
    const user = req.user;
    const review = req.body
    const reviewData = { user , ...review }
    const result = await ReviewUs.create(reviewData)  
    res.status(200).json({
      success: true,
      review: result
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message:error.message
    })
  }
  

  await db.disconnect();
})


export default handler