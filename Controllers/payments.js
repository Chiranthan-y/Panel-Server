const stripe = require('stripe')(
  'sk_test_51HRHE1AOoNCmQddTCmNMruMv9QFZZU4PjfNwhBbM27p17sx7BB3jbbsPmDtaNiJRibhTlYFruIE8lkqAuRIAQ9py00HjpLjg3Q'
);

exports.makePayment = async (req, res) => {
  console.log('body', req.body);

  // const amount = data.map((item) => (item.price += item.price));

  const payment = await stripe.paymentIntents.create({
    amount: 100,
    currency: 'usd',
    payment_method_types: ['card'],
  });
  if (payment.client_secret) {
    res.status(200).json({
      clientSecret: payment.client_secret,
    });
  } else {
    res.status(404).json({
      message: 'Payment failed',
    });
  }
};
