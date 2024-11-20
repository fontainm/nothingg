import express from 'express'
import Stripe from 'stripe'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import config from '../utils/config.js'
import { upgradeUser } from '../controllers/users.js'
import { getTokenFrom } from '../utils/helpers.js'

const checkoutRouter = express.Router()
const stripe = new Stripe(config.STRIPE_PRIVATE_KEY)
const endpointSecret = config.STRIPE_SIGNING_SECRET

checkoutRouter.post('/sessions', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.DOMAIN}/success`,
      cancel_url: `${process.env.DOMAIN}/dashboard`,
      metadata: { userId: decodedToken.id },
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Nothingg PRO',
              description:
                'Support the developer with a lifetime of Nothingg PRO.',
            },
            unit_amount: 500,
          },
          quantity: 1,
        },
      ],
    })
    res.success({ url: session.url }, 'Redirecting to checkout...')
  } catch (error) {
    next(error)
  }
})

checkoutRouter.post('/webhook', async (req, res, next) => {
  const signature = req.headers['stripe-signature']
  try {
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      endpointSecret
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const userId = session.metadata.userId

      await upgradeUser(userId)
      return res.success(session, 'Upgrade successful!')
    }

    res.success(null, 'Webhook received!')
  } catch (error) {
    next(error)
  }
})

export default checkoutRouter
