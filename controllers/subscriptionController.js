const User  = require('../models/User')
// const customError = require('../errors')
const stripe = require('stripe')('sk_test_51MxbsUEEwSz12DzqASH4j5lUy2Aq8YuB15y33HvjN1py7g9A9sx7QtL4II3XewmCuk5IIQ91xnzjUkJCRU2u4qLy00t2bd2NJ4');

const YOUR_DOMAIN = 'https://thefigplug.onrender.com/';

const createCheckoutSession = async (req, res) => {
  try {
    const { email } = req.body;

    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OLqs7EEwSz12DzqhPdBvYlK',
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        customer_email: email,
        automatic_tax: {enabled: true},
      });;
      
    // res.redirect(303, session.url);
    res.json({ session })

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports ={createCheckoutSession}

