import Stripe from 'stripe'
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res)
{
  if (req.method === 'POST')
  {
    console.log(req.body);
    try
    {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection:'auto',
        shipping_options: [
          {
            shipping_rate:'shr_1M18wEChQsYHEZthq3uy6uP2'
          },
          {
            shipping_rate:'shr_1M190LChQsYHEZthuxnYQjCO'
          }
        ],
        line_items: req.body.products.map(item =>
        {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                // images: [item.images],
              },
              unit_amount: item.price * 100
            },
            adjustable_quantity: {
              enabled: true,
              minimum:1
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      // res.redirect(303, session.url);
      res.status(200).json(session);
    } catch (err)
    {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else
  {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}