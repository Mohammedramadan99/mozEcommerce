import Stripe from 'stripe';
import Order from '../../../Modal/orderModel';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};
const createOrder = async (customer, data) =>
{
  const items = JSON.parse(customer.metadata.cart)
  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: items,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status
  })
  try
  {
    const savedOrder = await newOrder.save()
    console.log('processed order', savedOrder)
  } catch (error)
  {
    console.log(error)
  }
}
export default async function handler(req, res)
{
  if (req.method === 'POST')
  {
    let event;

    try
    {
      // 1. Retrieve the event by verifying the signature using the raw body and secret
      const rawBody = await buffer(req);
      const signature = req.headers['stripe-signature'];

      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        "whsec_528f227875b953e97486ccc82adefff7254a784cd9700ac0c325d00572b5ba6d"
      );
    } catch (err)
    {
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event
    console.log('✅ Success:', event.id);

    // 2. Handle event type (add business logic here)
    if (event.type === 'checkout.session.completed')
    {
      // stripe.customers.retrieve(event.data.object).then(cst => console.log(cst)).catch(err => console.log(err.message))
      // console.log("stripe",)
      // createOrder()
      console.log(`envent`, event);
      console.log(`💰  Payment received!`);
    } else
    {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // 3. Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else
  {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

