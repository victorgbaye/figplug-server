const User  = require('../models/User')
// const customError = require('../errors')
const stripe = require('stripe')('sk_test_51MxbsUEEwSz12DzqASH4j5lUy2Aq8YuB15y33HvjN1py7g9A9sx7QtL4II3XewmCuk5IIQ91xnzjUkJCRU2u4qLy00t2bd2NJ4');

const YOUR_DOMAIN = 'https://thefigplug.onrender.com/';

const createCheckoutSession = async (req, res) => {
  try {
    const { email } = req.body;
    // const user = await User.findOne({_id:req.params.id}).select('-password')
    // if (!user) {
    //     throw new customError.NotFoundError(`No user with id : ${req.params.id}`);
    //   }

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

// const stripe = require('stripe')('YOUR_SECRET_KEY');

// const createCheckoutSession = async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'Stubborn Attachments',
//               images: ['https://i.imgur.com/EHyR2nP.png'],
//             },
//             unit_amount: 2000, // $20.00 in cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: 'http://localhost:3000/success',
//       cancel_url: 'http://localhost:3000/canceled',
//     });

//     res.json({ sessionId: session.id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { createCheckoutSession };
