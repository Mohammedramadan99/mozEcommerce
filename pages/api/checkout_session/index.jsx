import nc from 'next-connect'
import { isAuth } from '../../../utils/auth'
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
const stripe = require('stripe')("sk_test_51M0i4WChQsYHEZthWWcjuWbGOn1d4jYJAp8c3ArO0ykGv2AYG4zSdR4byJqkhFGhK2OGru3UETykCsnbXZzeQMX000KdgJAcQd")

handler.use(isAuth).post(async (req, res) =>
{
  await db.connect();
  console.log(req.body.amount)
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
})

export default handler
