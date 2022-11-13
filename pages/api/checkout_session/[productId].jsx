import nc from 'next-connect'
import {isAuth} from '../../../utils/auth'
import Product from '../../../Modal/ProductsModel'
import db from '../../../utils/db/dbConnect'
const handler = nc()

const hostname =
  typeof window !== "undefined" && window.location.hostname
    ? window.location.hostname
    : "";
const origin =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

handler.use(isAuth).get(async (req,res) =>
{
  await db.connect();

  // Get product details
  const product = await Product.findById(req.query.productId);
  console.log(product)

  const { checkInDate, checkOutDate, daysOfStay } = req.query;

  // Create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `http://localhost:3000/bookings/me`,
    cancel_url: `http://localhost:3000/product/${product._id}`,
    // customer_email: req.user.email,
    // client_reference_id: req.query.productId,
    // metadata: { checkInDate, checkOutDate, daysOfStay },
    line_items: [
      {
        // images: [`${product.images[0].url}`],
        // amount: req.query.amount * 100,
        // currency: 'usd',
        quantity: product?.quantity ? product?.quantity : 2,
        price_data: {
          currency: 'usd',
          unit_amount: req.query.amount,
          product_data: {
            name: 'T-shirt',
            description: 'Comfortable cotton t-shirt',
            // images: product.images[0].url,
          },
        },
      },
    ],
    mode: 'payment',

  })

  res.status(200).json(session)
})

export default handler
