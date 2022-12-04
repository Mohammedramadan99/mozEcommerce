import Stripe from 'stripe'
import nc from 'next-connect'
import { isAuth } from '../../../utils/auth'
import db from '../../../utils/db/dbConnect'
import Order from '../../../Modal/orderModel'
const handler = nc()
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);



handler.post(async (req, res) =>
{
  try
  {
    const products = req?.body?.orderData?.products.toString()
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.body.userId,
        cart: products,
      }
    })
    // console.log('first', customer.metadata.cart.map(p => p))
    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto', 
      shipping_options: [
        {
          shipping_rate: 'shr_1M18wEChQsYHEZthq3uy6uP2'
        }
      ],
      customer: customer.id,
      line_items: req?.body?.orderData?.products?.map(item =>
      {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item?.images[0]?.url],
              metadata: {
                id:item._id
              },
            },
            unit_amount: item.price * 100
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1
          },
          quantity: item.quantity
        }
      }),
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart`,
    }
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create(params);
    // res.redirect(303, session.url);
    res.status(200).json({
      session
    })
  } catch (err)
  {
    res.status(err.statusCode || 500).json({
      success: false,
      msg: err.message
    });
  }
})

export default handler