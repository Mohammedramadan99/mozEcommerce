import Stripe from 'stripe';
import nc from 'next-connect'
const handler = nc()
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

handler.get(async (req, res) =>
{
  const id = req.query.id;
  
  console.log(!id.startsWith('cs_'))
  try
  {
    if (!id.startsWith('cs_'))
    {
      throw Error('Incorrect CheckoutSession ID.');
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(id);
    console.log('checkout_session', checkout_session)
    res.status(200).json({
      success: true,
      checkout_session
    });
  } catch (err)
  {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
})
export default handler;
