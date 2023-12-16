// const express = require('express');
// const router = express.Router();
// const stripeController = require('../controllers/subscriptionController');
// // const {
// //     authenticateUser,
// //   } = require('../middleware/authentication');

// const { createCheckoutSession } = require('../controllers/subscriptionController')

// router.post('/create-checkout-session', stripeController.createCheckoutSession);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const {createCheckoutSession} = require('../controllers/subscriptionController');

// router.post('/create-checkout-session',createCheckoutSession);

// module.exports = router;

const express = require('express');
const router = express.Router();
// const {
//     authenticateUser,
//   } = require('../middleware/authentication');
const {createCheckoutSession} = require('../controllers/subscriptionController');

router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;

