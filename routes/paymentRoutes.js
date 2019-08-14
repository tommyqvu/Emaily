const { STRIPE_SECRET_KEY } = require('../config/key');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    try {
      const payment = await stripe.charges.create({
        amount: 500,
        currency: 'eur',
        description: '5$ for 5 email credits',
        source: req.body.id,
      });
      req.user.credits += 5;
      const user = await req.user.save();
      res.send(user);
    } catch (e) {
      console.log(e);
    }
  });
};
